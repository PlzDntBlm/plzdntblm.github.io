import {environment, player, currentRoom, commands, inventory} from "./data.js";
import {appendToOutput} from "../../main.js";
import "./audioManager.js";

let lastInteractionTime = Date.now();
let reminderInterval = null;
let unproductiveInputCount = 0;
const IDLE_THRESHOLD = 300000; // 5 minutes in milliseconds
const UNPRODUCTIVE_INPUT_LIMIT = 6;

function sendReminder() {
    const currentTime = Date.now();
    const idleTime = currentTime - lastInteractionTime;

    if (idleTime >= IDLE_THRESHOLD) {
        let newParagraph = {};
        if (player.isHungry) {
            if (player.hungerSeries === 1) {
                newParagraph.innerHTML = "The gnawing hunger inside you makes it hard to focus on anything else. You need to find a way out of here and get some food.";
            } else if (player.hungerSeries === 2) {
                newParagraph.innerHTML = "Your hunger is becoming unbearable. Every passing minute feels like an eternity. Escape is your only hope.";
            }
        } else {
            newParagraph.innerHTML = "You must find a way to escape this place. Every moment you linger here could be your last.";
        }
        appendToOutput(newParagraph);

        // Reset counters and idle time after sending a reminder
        lastInteractionTime = Date.now();
        unproductiveInputCount = 0;
        clearInterval(reminderInterval);
    }
}

function forceHint() {
    let newParagraph = {};
    newParagraph.innerHTML = "Hint: Remember, you need to find a way to escape. Have you tried examining your surroundings more closely?";
    appendToOutput(newParagraph);

    // Reset counters and idle time after forcing a hint
    lastInteractionTime = Date.now();
    unproductiveInputCount = 0;
    clearInterval(reminderInterval);
}

function startReminderInterval() {
    if (reminderInterval) clearInterval(reminderInterval);
    reminderInterval = setInterval(sendReminder, 60000); // Check every 60 seconds
}

export function startNewGame() {
    // Reset player state
    player.hasDiarrhea = false;
    player.isHungry = false;
    player.isTired = false;
    player.hasEaten = false;
    player.hungerSeries = 0;

    // Reset inventory
    for (let item in inventory) {
        inventory[item].inInventory = false;
    }

    // Set initial environment
    currentRoom.set(environment.Room);

    // Clear local storage if any
    localStorage.removeItem("saveData");

    // Output the initial game state
    appendToOutput({innerHTML: `You awake from a deep slumber. This is not your home. You do not remember how you got here. </br></br> What do you do?`});
    let newParagraph = {};
    newParagraph.innerHTML = `Available Commands (append the object you want to interact with)</br>` + listAllCommands();
    appendToOutput(newParagraph);

    // Start the reminder interval
    startReminderInterval();
}

export function startGame() {
    // Initialize game state, environment, player status, etc.
    player.hasDiarrhea = false;
    currentRoom.set(environment.Room);
    // More initialization code here
    appendToOutput({innerHTML: `You awake from a deep slumber. This is not your home. You do not remember how you got here. </br></br> What do you do?`});
    let newParagraph = {};
    newParagraph.innerHTML = `Available Commands (append the object you want to interact with)</br>` + listAllCommands();
    appendToOutput(newParagraph);

    // Start the reminder interval
    startReminderInterval();
}

export function handleGameCommand(input) {
    console.clear();

    let wasValidCommand = false;
    let selectedCommand = null;
    if (input.toUpperCase() === "HELP") { // Check if help CASE 1
        let newParagraph = {};
        newParagraph.innerHTML = `Available Commands (append the object you want to interact with)</br>` + listAllCommands();
        appendToOutput(newParagraph);
        wasValidCommand = true;
    } else if (input.toUpperCase() === "INVENTORY") { // Check if inventory CASE 2
        appendToOutput({innerHTML: listInventoy()});
        wasValidCommand = true;
    } else if (input.toUpperCase() === "LOAD") { // Check if inventory CASE 2
        commands.Load.action();
        wasValidCommand = true;
    } else if (input.toUpperCase() === "SAVE") { // Check if inventory CASE 2
        commands.Save.action();
        wasValidCommand = true;
    } else if (input.toUpperCase() === "RESTART") { // Check if inventory CASE 2
        commands.Restart.action();
        wasValidCommand = true;
    } else { // Check if valid command
        for (let command in commands) {
            // Check if input is a valid command (case-insensitive)
            if (input.toUpperCase().startsWith(command.toUpperCase())) { // Valid command true
                // Calculate the start index of the parameter by adding the command's length plus one (for the space)
                let startIndex = command.length + 1;
                // Extract parameter, trimming the start to remove any leading spaces
                let parameter = input.length > startIndex ? input.slice(startIndex).trim() : null;
                if (commands[command].acceptsParameter) {
                    if (commands[command].needsParameter) {
                        if (parameter) {
                            let target = null;

                            // Check if parameter is viable target
                            for (let roomKey in environment) { // Parameter is a room
                                if (normalizeParameter(parameter).toUpperCase() === roomKey.toUpperCase()) {
                                    target = environment[roomKey];
                                }
                            }
                            if (normalizeParameter(parameter).toUpperCase() === "ROOM") { // Parameter is current room
                                target = currentRoom;
                            }
                            if (currentRoom.value.interactables) { // Parameter is an interactable
                                for (let interactablesKey in currentRoom.value.interactables) {
                                    if (normalizeParameter(parameter).toUpperCase() === interactablesKey.toUpperCase()) {
                                        target = currentRoom.value.interactables[interactablesKey];
                                    }
                                }
                            }
                            for (let item in inventory) {
                                if (normalizeParameter(parameter).toUpperCase() === item.toUpperCase()) {
                                    if (inventory[item].inInventory) {
                                        target = inventory[item];
                                    }
                                }
                            }

                            if (target) { // Target is a room
                                selectedCommand = command; // Set selected command

                                if (target[command] instanceof Function) {
                                    target[command]();
                                    wasValidCommand = true;
                                } else { // You can't do that CASE 6.5
                                    appendToOutput({innerHTML: `At least you can not do that.`});
                                    unproductiveInputCount++;
                                }
                            } else { // Target not found CASE 6
                                appendToOutput({innerHTML: `You can not find a <i>${parameter}</i>.`});
                                unproductiveInputCount++;
                            }
                        } else { // Player has forgotten to add parameter CASE 5
                            appendToOutput({innerHTML: `You need to add a parameter to your command.`});
                            unproductiveInputCount++;
                        }
                    } else {
                        selectedCommand = command; // Set selected command
                        currentRoom.value[command]();
                        wasValidCommand = true;
                    }
                } else { // Calling command without input parameter CASE 4
                    selectedCommand = command; // Set selected command
                    currentRoom.value[command]();
                    wasValidCommand = true;
                }
                break; // Exit the loop after finding the first matching command
            }
        }
    }
    if (!wasValidCommand) { // Not a valid command CASE 3
        appendToOutput({innerHTML: `This was not a valid command... maybe check 'help'?`});
        unproductiveInputCount++;
    }

    // Force a hint if unproductive input limit is reached
    if (unproductiveInputCount >= UNPRODUCTIVE_INPUT_LIMIT) {
        forceHint();
    }

    // Update the last interaction time
    lastInteractionTime = Date.now();

    // Restart the reminder interval
    startReminderInterval();
}

function listAllCommands() {
    let commandListString = '';
    for (const [command, details] of Object.entries(commands)) {
        commandListString += `<ins>${command}</ins> - ${details.description} </br>`;
    }
    return commandListString;
}

function listInventoy() {
    let listString = `You currently are in possession of:</br>`;
    let itemsInPossesion = '';
    for (const [item, details] of Object.entries(inventory)) {
        if (details.inInventory) {
            itemsInPossesion += `${item}</br>`;
        }
    }
    return itemsInPossesion ? listString + itemsInPossesion : "You have currently nothing in your possession.";
}

function normalizeParameter(parameter) {
    const descriptors = {
        "wooden table": "table",
        "metal door": "door",
        "white door": "kitchen",
        "kitchen door": "kitchen",
        "bathroom door": "bathroom",
        "white wooden door": "kitchen",
        "smeared paper": "note",
        "sheet of paper": "note",
        "paper": "note",
        "the mattress on the bed": "bed",
        "mattress": "bed",
        "metal cans": "Cans",
        "can": "Cans"
    };

    let normalizedParameter = parameter.toLowerCase().trim();

    // Using regular expressions to ensure whole word matching
    Object.entries(descriptors).forEach(([desc, norm]) => {
        let regex = new RegExp("\\b" + desc + "\\b", "g");
        if (regex.test(normalizedParameter)) {
            normalizedParameter = normalizedParameter.replace(regex, norm);
            return; // Exit the loop after the first replacement
        }
    });

    // Remove any leading "the " and trailing periods from the result
    normalizedParameter = normalizedParameter.replace(/^the\s+/, "").replace(/\.$/, "");

    return normalizedParameter;
}
