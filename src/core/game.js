import {environment, player, currentRoom, commands, inventory} from "./data.js";
import {appendToOutput} from "../../main.js";

export function startGame() {
    // Initialize game state, environment, player status, etc.
    // Example:
    player.hasDiarrhea = false;
    currentRoom.set(environment.Room);
    // More initialization code here
    appendToOutput({innerHTML: "You awake from a deep slumber. What do you do?"});
}

export function handleGameCommand(input) {
    console.clear();

    let wasValidCommand = false;
    let selectedCommand = null;
    if (input.toUpperCase() === "HELP") { // Check if help CASE 1
        let newParagraph = {}
        newParagraph.innerHTML = listAllCommands();
        appendToOutput(newParagraph);
        wasValidCommand = true;
    } else if (input.toUpperCase() === "INVENTORY") { // Check if inventory CASE 2
        appendToOutput({innerHTML: listInventoy()});
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
                                    console.log(interactablesKey)
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
                                console.log("Found target: ", target);

                                console.log(`Calling command: ${command} with parameter\nParameter: ${parameter}`);
                                selectedCommand = command; // Set selected command

                                if (target[command] instanceof Function) {
                                    target[command]();
                                } else { // You can't do that CASE 6.5
                                    appendToOutput({innerHTML: `At least you can not do that.`});
                                }
                            } else { // Target not found CASE 6
                                console.log("Target not found");
                                appendToOutput({innerHTML: `You can not find a ${parameter}`})
                            }
                        } else { // Player has forgotten to add parameter CASE 5
                            console.error(`Calling command: ${command}\nMISSING PARAMETER`);
                            appendToOutput({innerHTML: `You need to add a parameter to your command.`});
                        }
                    } else {
                        console.log(`Calling command: ${command}`);
                        selectedCommand = command; // Set selected command

                        currentRoom.value[command]();
                    }
                } else { // Calling command without input parameter CASE 4
                    console.log(`Calling command: ${command} with no parameters`);
                    selectedCommand = command; // Set selected command
                    currentRoom.value[command]();
                }
                wasValidCommand = true;
                break; // Exit the loop after finding the first matching command
            }
        }
    }
    if (!wasValidCommand) { // Not a valid command CASE 3
        appendToOutput({innerHTML: `This was not a valid command... maybe check 'help'?`});
    }
}

function listAllCommands() {
    let commandListString = '';
    for (const [command, details] of Object.entries(commands)) {
        commandListString += `${command} - ${details.description} </br>`;
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