import {appendToOutput} from "../../main.js";

export let commands = {
    "Enter": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Enter a specified area or room."
    },
    "Exit": {
        needsParameter: false,
        acceptsParameter: false,
        description: "Leave the current area or room."
    },
    "Look at": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Examine a specific object or item closely."
    },
    "Look around": {
        needsParameter: false,
        acceptsParameter: false,
        description: "Observe the current location and its noticeable objects."
    },
    "Examine": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Take a closer look at a specific object, item, or direction."
    },
    "Inventory": {
        needsParameter: false,
        acceptsParameter: false,
        description: "Check the items currently in your possession."
    },
    "Take": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Pick up an item and add it to your inventory."
    },
    /*"Drop": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Remove an item from your inventory and leave it at your current location."
    },*/
    "Use": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Utilize an item from your inventory on something in your environment or another item."
    },
    "Open": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Open a container or entryway."
    },
    "Lift": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Use your arms to move an object in the positive direction of the vertical axis of earth."
    },
    "Eat":{
        needsParameter: true,
        acceptsParameter: true,
        description: "Consume an item."
    }
    /*"Close": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Close a container or entryway."
    },
    "Talk to": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Initiate a conversation with a character."
    },
    "Ask": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Inquire about a specific topic with a character or item."
    },
    "Give": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Hand over an item from your inventory to a character or use it on an object."
    },
    "Save": {
        needsParameter: false,
        acceptsParameter: true,
        description: "Save your current game progress."
    },
    "Load": {
        needsParameter: false,
        acceptsParameter: true,
        description: "Load a previously saved game."
    },
    "Restart": {
        needsParameter: false,
        acceptsParameter: false,
        description: "Restart the game from the beginning."
    },
    "Quit": {
        needsParameter: false,
        acceptsParameter: false,
        description: "Quit the game."
    }*/
};

export let player = {
    hasDiarrhea: false,
    isHungry: false,
    isTired: false,
    hasEaten: false,
    hungerSeries: 0,
    hungerAwakening: ["You wake up feeling hollow, your stomach's complaints the first thing you notice. Hunger gnaws at you, a reminder of your body's needs.", "You awake weaker than before, your body's reserves running low. Every movement feels heavier, a testament to your growing hunger.", "As you drift off, a profound weakness overtakes you, the lack of sustenance finally claiming its toll. Darkness envelops you, a final sleep from which there is no awakening."],
    inStomach: null,
    "HungerDeath": () => {
        let newParagraph = {};
        newParagraph.innerHTML = "As the shadow of hunger engulfs you for the third time without reprieve, the vital strength that once propelled you fades into nothingness. In this final sleep, devoid of dreams, you're released from the relentless grip of survival. The journey concludes not with triumph, but with a quiet surrender to the inevitable silence that follows.";
        appendToOutput(newParagraph);
        newParagraph.innerHTML = "You died.";
        appendToOutput(newParagraph);
        newParagraph.innerHTML = "THE END";
        appendToOutput(newParagraph);
    },
    "StupidDeath": () => {
        let newParagraph = {};
        newParagraph.innerHTML = "In a tragic turn, as you flush away the key, the faint hope of escape drains with it. Alone, with no means to leave and the weight of your choices heavy upon you, despair settles in. Time blurs as the walls of your confinement seem to close in, each day indistinguishable from the next until, finally, stillness takes hold. Your story ends not with a bang, but with the silent, inevitable fade of defeat, a solemn reminder of the fragile thread upon which fate hangs.";
        appendToOutput(newParagraph);
        newParagraph.innerHTML = "You died.";
        appendToOutput(newParagraph);
        newParagraph.innerHTML = "THE END";
        appendToOutput(newParagraph);
    }
}
export let environment = {
    "Room": {
        name: "Bedroom",
        "Enter": () => {
            let newParagraph = {};
            newParagraph.innerHTML = "You walk back into the room you woke up in.";
            currentRoom.set(environment.Room);
            appendToOutput(newParagraph);
        },
        "Look at": () => {
            environment.Room["Look around"]();
        },
        "Look around": () => {
            if(currentRoom.value !== environment.Room){
                environment.Room.Enter();
            }
            let newParagraph = {};
            newParagraph.innerHTML = `Concrete walls. No windows. Three doors:</br>One <ins>metal door</ins> - probably leading outside.</br>A white <ins>wooden door</ins> - a sign: <ins>Kitchen</ins>.</br>Another white door with a silver symbol - a child peeing into a pot. The <ins>bathroom</ins>?</br></br>In one corner stands the simple wooden <ins>bed</ins> with the dirty mattress you have slept on.</br>Centered: a wooden <ins>table</ins>.`;
            newParagraph.image = './src/assets/images/Room.png';
            appendToOutput(newParagraph);
        },
        "Examine": () => {
            environment.Room["Look around"]();
        },
        "Exit": () => {
            environment.Room.interactables.Door.Use();
        },
        interactables: {
            Door: {
                unlocked: false,
                opened: false,
                "Unlock door": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `You stick the key into the doors lock,</br>turn it around...</br></br> CLICK!</br></br>The door is unlocked.</br>You throw the key away.`;
                    environment.Room.interactables.Door.unlocked = true;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `REMOVED FROM INVENTORY: Key`;
                    inventory.Key.inInventory = false;
                    appendToOutput(newParagraph);
                },
                "Exit door": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `The door that kept you from freedom swings open.</br>Sun's bright light strikes your eyes.</br>You leave this reeking place.</br></br>You have won - but at what price?`;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `You won.`;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `THE END`;
                    appendToOutput(newParagraph);
                },
                "Look at": () => {
                    environment.Room.interactables.Door.Examine();
                },
                "Examine": () => {
                    let newParagraph = {};
                    // door closed, door locked, no key
                    if (!environment.Room.interactables.Door.opened&& !environment.Room.interactables.Door.unlocked&& !inventory.Key.inInventory) {
                        newParagraph.innerHTML = "The door that seems to lead outside doesn't appear to move. It is locked.";
                        appendToOutput(newParagraph);
                    }
                    // door closed, door locked, has key
                    else if (!environment.Room.interactables.Door.opened && !environment.Room.interactables.Door.unlocked && inventory.Key.inInventory) {
                        newParagraph.innerHTML = "The door is locked. But maybe you have something you could use...";
                        appendToOutput(newParagraph);
                    }
                    // door closed, door unlocked, has key
                    else if (!environment.Room.interactables.Door.opened && environment.Room.interactables.Door.unlocked) {
                        newParagraph.innerHTML = "You stand in front of the unlocked but shut metal door.";
                        appendToOutput(newParagraph);
                    }
                },
                "Use": () => {
                    let newParagraph = {};
                    // door closed, door locked, no key
                    if (environment.Room.interactables.Door.opened === false && !environment.Room.interactables.Door.unlocked && !inventory.Key.inInventory) {
                        newParagraph.innerHTML = "You pull the handle. The door doesn't move.";
                        appendToOutput(newParagraph);
                    }
                    // door closed, door locked, has key
                    if (!environment.Room.interactables.Door.opened && !environment.Room.interactables.Door.unlocked && inventory.Key.inInventory) {
                        environment.Room.interactables.Door["Unlock door"]();
                    }
                    // door closed, door unlocked, has key
                    else if (!environment.Room.interactables.Door.opened && environment.Room.interactables.Door.unlocked) {
                        environment.Room.interactables.Door["Exit door"]();
                    }
                },
                "Open": () => {
                    environment.Room.interactables.Door.Use();
                },
            },
            Table: {
                "Look at": () => {
                    environment.Room.interactables.Table.Examine();
                },
                "Examine": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `There appears to be nothing interesting about this common wooden table.</br>Four legs, a plate.</br>But something catches your eye: There is a single sheet of <ins>paper</ins> visibly placed on it.`;
                    appendToOutput(newParagraph);
                },
            },
            Note: {
                "Look at": () => {
                    environment.Room.interactables.Note.Examine();
                },
                "Examine": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `You read the words that have been written ugly in red: </br></br>"${inventory.Note.text}"`;
                    appendToOutput(newParagraph);
                },
                "Take": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `You put the paper scrambled into a ball into the pocket of your pants.`;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `ADDED TO INVENTORY: Note`;
                    appendToOutput(newParagraph);
                    inventory.Note.inInventory = true;
                    inventory.Note.location = "Pockets of your pants";
                },
                "Drop": () => {
                    let newParagraph = {};
                    if (inventory.Note.inInventory) {
                        newParagraph.innerHTML = inventory.Note.name === "Note" ? `There is no one here to stop you:</br>You drop the Note in the ${currentRoom.value}.` : `I don't know why you had put it back into you pockets anyway, but...</br>You drop the ${inventory.Note.name} in the ${currentRoom}.`;
                        appendToOutput(newParagraph);
                        newParagraph.innerHTML = `REMOVED FROM INVENTORY: ${inventory.Note.name}`;
                        appendToOutput(newParagraph);
                        inventory.Note.inInventory = false;
                        inventory.Note.location = currentRoom.value;
                    }
                },
                "Use": () => {
                    if (player.hasDiarrhea && inventory.Note.inInventory) {
                        let newParagraph = {};
                        inventory.Note.name = "Smeared Paper";
                        newParagraph.innerHTML = `It has finally found its use:</br>You give your best to wipe of your bum with the paper.`;
                        appendToOutput(newParagraph);
                        newParagraph.innerHTML = `You put the ${inventory.Note.name} back into your pocket.`;
                        appendToOutput(newParagraph);
                    }
                },
            },
            Bed: {
                "Look at": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = "The bed looks old and worn, with a thin, dirty mattress that has seen better days.";
                    appendToOutput(newParagraph);
                },
                "Examine": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = "The bed, barely more than a wooden frame with a thin, dirty mattress, looks uncomfortable. It is covered with stains and small tears, suggesting many nights of unrest.";
                    appendToOutput(newParagraph);
                },
                "Use": () => {
                    console.log("sleep", player.hungerSeries);
                    let newParagraph = {};
                    if (!player.hasDiarrhea) {
                        if (player.inStomach) {
                            if (player.inStomach === inventory["Simple Meal"]) {
                                newParagraph.innerHTML = `The weight of your full stomach pulls you down into an uneasy slumber on the stained mattress, enveloping you in its damp embrace. The filth doesn't bother you as much as the unsettling fullness within.`;
                                appendToOutput(newParagraph);
                            } else {
                                newParagraph.innerHTML = "Your rest is fitful. Despite the initial fulfillment, discomfort soon follows, casting a shadow over your slumber. You toss and turn, uneasy with the realization that your choice might have consequences yet to reveal themselves";
                                appendToOutput(newParagraph);
                                newParagraph.innerHTML = `A distressing churn in your belly awakens you, a dire need clawing at your insides. It is unmistakable; the urge to relieve yourself is overwhelming, signaling the onset of an unfortunate digestive rebellion.`;
                                appendToOutput(newParagraph);
                                player.hasDiarrhea = true;
                            }
                            player.inStomach = null;
                            player.hungerSeries = 0;
                        } else {
                            player.isHungry = true;
                            newParagraph.innerHTML = player.hungerAwakening[player.hungerSeries];
                            appendToOutput(newParagraph);
                            if (player.hungerSeries === 2) {
                                player.HungerDeath();
                            }
                            player.hungerSeries++;
                        }
                    } else {
                        newParagraph.innerHTML = "As you settle into bed, the urge to relieve yourself becomes undeniable, disrupting any chance of sleep. The discomfort grows, a stark reminder that some needs can't be ignored, no matter how weary you may be. It's clear that rest will remain elusive until you address the pressing call of nature.";
                        appendToOutput(newParagraph);
                    }
                },
                "Take": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = "it is a bed. You cannot take it with you.";
                    appendToOutput(newParagraph);
                },
                "Lift": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = "A whole lot of nothing. Just some lice vibing hard.";
                    appendToOutput(newParagraph);
                }
            }
        },
    },
    "Kitchen": {
        name: "Kitchen",
        "Enter": () => {
            let newParagraph = {};
            if (currentRoom.value === environment.Kitchen) {
                newParagraph.innerHTML = "You are already in the Kitchen.";
            } else {
                newParagraph.innerHTML = "You walk into the kitchen. The door was not locked.";
                currentRoom.set(environment.Kitchen);
            }
            appendToOutput(newParagraph);
        },
        "Use": () => {
            environment.Kitchen.Enter();
        },
        "Exit": () => {
            environment.Room.Enter();
        },
        "Look at": () => {
            this["Look around"]();
        },
        "Look around": () => {
            if(currentRoom.value !== environment.Kitchen){
                environment.Kitchen.Enter();
            }

            let newParagraph = {};
            newParagraph.innerHTML = `The kitchen consists of a counter, sink, <ins>fridge</ins>, several cooking utensils, a knife, and a <ins>shelf</ins> filled with items. The fridge hums quietly, promising ingredients that may or may not be past their prime.`;
            newParagraph.image = "./src/assets/images/Kitchen.png";
            appendToOutput(newParagraph);
        },
        "Examine": () => {
            environment.Kitchen["Look around"]();
        },
        /*"Knife": {
            "Examine": () => {
                let newParagraph = {};
                newParagraph.innerHTML = "The knife gleams under the kitchen's flickering light. It is sharp, an ominous presence on the counter.";
                appendToOutput(newParagraph);
            },
            "Use": () => {
                let newParagraph = {};
                // Warning: The following content is sensitive and may not be suitable for all audiences.
                newParagraph.innerHTML = "With a sense of despair, you pick up the knife. What happens next is a tragic culmination of events, marking a dark end to your journey.";
                appendToOutput(newParagraph);
                // Implement game-ending logic here
            },
        },*/
        "Open": () => {
            environment.Kitchen.Enter();
        },
        "Close": () => {
            environment.Room.Enter();
        },
        interactables: {
            "Fridge": {
                isOpen: false,
                "Examine": () => {
                    let newParagraph = {};

                    if(!environment.Kitchen.interactables.Fridge.isOpen){
                        newParagraph.innerHTML = `Smudges and mold cover the once smooth white surface of the humming device.`;
                        appendToOutput(newParagraph);
                    }else{
                        environment.Kitchen.interactables.Fridge.Take();
                    }
                },
                "Look at": () => {
                    environment.Kitchen.interactables.Fridge.Examine();
                },
                "Take": () => {
                    if (environment.Kitchen.interactables.Fridge.isOpen && !inventory["Spoiled Ingredients"].taken) {
                        inventory["Spoiled Ingredients"].Take();
                    } else if (!environment.Kitchen.interactables.Fridge.isOpen) {
                        environment.Kitchen.interactables.Fridge.Open();
                    } else {
                        let newParagraph = {};
                        newParagraph.innerHTML = `You already took the items from the fridge.`;
                        appendToOutput(newParagraph);
                    }
                },
                "Use": () => {
                    environment.Kitchen.interactables.Fridge.Take();
                },
                "Open": () => {
                    if (!environment.Kitchen.interactables.Fridge.isOpen) {
                        let newParagraph = {};
                        newParagraph.innerHTML = `There is a nasty wet sound as the mold between the rims of the door rips apart. A weird stench hits your nostrils. <ins>There is something inside</ins>.`;
                        appendToOutput(newParagraph);
                        environment.Kitchen.interactables.Fridge.isOpen = true;
                    } else {
                        let newParagraph = {};
                        newParagraph.innerHTML = `The fridge was already opened.`;
                        appendToOutput(newParagraph);
                    }
                },
                "Lift": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `You are to weak too carry this beast.`;
                    appendToOutput(newParagraph);
                }
            },
            "Shelf": {
                looted: false,
                "Examine": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `A dusty wooden contraption. Besides some less relevant looking things there is something that catches your eye: Some metal <ins>cans</ins>.`;
                    appendToOutput(newParagraph);
                },
                "Look at": () => {
                    environment.Kitchen.interactables.Shelf.Examine();
                },
                "Take": () => {
                    if (!inventory["Good Ingredients"].inInventory && !environment.Kitchen.interactables.Shelf.looted) {
                        inventory["Good Ingredients"].Take();
                        environment.Kitchen.interactables.Shelf.looted = true;
                    } else {
                        let newParagraph = {};
                        newParagraph.innerHTML = `There is nothing interesting left to haul.`;
                        appendToOutput(newParagraph);
                    }
                },
                "Use": () => {
                    environment.Kitchen.interactables.Shelf.Take();
                },
                "Open": () => {
                    environment.Kitchen.interactables.Shelf.Take();
                },
                "Lift": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `Why would you do that?`;
                    appendToOutput(newParagraph);
                }
            },
            "Cans": {
                "Examine": () => {
                    inventory["Good Ingredients"].Examine();
                },
                "Look at": () => {
                    inventory["Good Ingredients"].Examine();
                },
                "Take": () => {
                    environment.Kitchen.interactables.Shelf.Take();
                },
                "Use": () => {
                    inventory["Good Ingredients"].Use();
                },
                "Open": () => {
                    inventory["Good Ingredients"].Open();
                },
                "Lift": () => {
                    environment.Kitchen.interactables.Shelf.Take();
                }
            }
        }
    },
    "Bathroom": {
        name: "Bathroom",
        "Enter": () => {
            let newParagraph = {};
            if (currentRoom.value === environment.Bathroom) {
                newParagraph.innerHTML = "You are already in the bathroom.";
            } else {
                newParagraph.innerHTML = "You walk into the bathroom. The door was not locked.";
                currentRoom.set(environment.Bathroom);
            }
            appendToOutput(newParagraph);
        },
        "Exit": () => {
            environment.Room.Enter();
        },
        "Look at": () => {
            environment.Bathroom["Look around"]();
        },
        "Look around": () => {
            if(currentRoom.value !== environment.Bathroom){
                environment.Bathroom.Enter();
            }
            let newParagraph = {};
            newParagraph.innerHTML = `Within the dirty old bathroom you find the classic <ins>toilet</ins>, a scratched up ceramic sink and a shelf.`;
            newParagraph.image = './src/assets/images/Bathroom.png';
            appendToOutput(newParagraph);
        },
        "Examine": () => {
            environment.Bathroom["Look around"]();
        },
        "Use": () => {
            environment.Bathroom.Enter();
        },
        "Open": () => {
            environment.Bathroom.Enter();
        },
        "Close": () => {
            environment.Room.Enter();
        },
        interactables: {
            "Toilet": {
                used: false,
                flushed: false,
                "Look at": () => {
                    environment.Bathroom.interactables.Toilet.Examine();
                },
                "Examine": () => {
                    let newParagraph = {};
                    if (!environment.Bathroom.interactables.Toilet.used && !environment.Bathroom.interactables.Toilet.flushed) {
                        newParagraph.innerHTML = !player.hasDiarrhea ? "You really never want to use this dirty throne." : "The pressure is hard. Will you risk it?";
                        appendToOutput(newParagraph);
                    } else if (environment.Bathroom.interactables.Toilet.used && !environment.Bathroom.interactables.Toilet.flushed) {
                        // Add hint about the key
                        newParagraph.innerHTML = `Peering into the bowl reveals a ghastly sight and amidst the chaos, something glimmers unnaturally. Could it be? The key you have been searching for is lodged within the mess.`;
                        appendToOutput(newParagraph);
                    } else if (environment.Bathroom.interactables.Toilet.used && environment.Bathroom.interactables.Toilet.flushed) {
                        // Player has flushed the key
                        newParagraph.innerHTML = "Even after flushing, the toilet bears the scars of its recent use. Any evidence of the key has been washed away into the plumbing, along with your hopes of escape.";
                        appendToOutput(newParagraph);
                    }
                },
                "Use": () => {
                    let newParagraph = {};
                    if (!player.hasDiarrhea && !environment.Bathroom.interactables.Toilet.used) {
                        newParagraph.innerHTML = "Fortunately, you do not need to use this place right now. And you hope you never must.";
                        appendToOutput(newParagraph);
                    } else if (player.hasDiarrhea && !environment.Bathroom.interactables.Toilet.used) {
                        // Player uses the toilet for the first time with diarrhea
                        newParagraph.innerHTML = `In a moment of desperation, you use the toilet. The ordeal is as quick as it is unpleasant. After the deed is done, a sense of relief washes over you, but as you stand up, you notice a metallic clink among the turmoil below. The <ins>key</ins>!`;
                        appendToOutput(newParagraph);
                        environment.Bathroom.interactables.Toilet.used = true; // Mark the toilet as used
                        newParagraph.innerHTML = `ADDED TO INVENTORY: ${inventory.Key.name}`;
                        appendToOutput(newParagraph);
                        inventory.Key.inInventory = true;
                    } else if (player.hasDiarrhea && environment.Bathroom.interactables.Toilet.used && !environment.Bathroom.interactables.Toilet.flushed) {
                        // If the player attempts to use it again before flushing
                        newParagraph.innerHTML = "You have already done what needed to be done. There is nothing left for you here, except... wasn't there something you noticed?";
                        appendToOutput(newParagraph);
                    }
                },
                "Flush": () => {
                    let newParagraph = {};
                    if (environment.Bathroom.interactables.Toilet.used && !environment.Bathroom.interactables.Toilet.flushed) {
                        newParagraph.innerHTML = "You press the flush handle, and the contents of the toilet, along with the glimmering key, swirl away into the abyss. A sinking feeling tells you that was a grave mistake.";
                        appendToOutput(newParagraph);
                        environment.Bathroom.interactables.Toilet.flushed = true; // Mark the toilet as flushed, key is now lost
                        // Implement game logic for losing the key here, possibly leading to a game over scenario
                    } else {
                        newParagraph.innerHTML = "Nothing to flush.";
                        appendToOutput(newParagraph);
                    }
                },
                "Take Key": () => {
                    let newParagraph = {};
                    if (environment.Bathroom.interactables.Toilet.used && !environment.Bathroom.interactables.Toilet.flushed) {
                        // Allow the player to retrieve the key if they haven't flushed yet
                        newParagraph.innerHTML = "Bracing yourself against the vile smell, you reach into the toilet and retrieve the soiled key. It is disgusting, but necessary.";
                        appendToOutput(newParagraph);
                        inventory.Key.inInventory = true; // Add key to inventory
                        environment.Bathroom.interactables.Toilet.flushed = true; // Prevent further interaction
                    } else {
                        newParagraph.innerHTML = "There is nothing for you to retrieve here.";
                        appendToOutput(newParagraph);
                    }
                }
            }
        },
    }
};
export let currentRoom =
    {
        value: environment.Room,
        get() {
            return this.value;
        },
        set(x) {
            this.value = x;
        }
    };
export let inventory = {
    "Key": {
        name: "Key",
        inInventory: false,
        description: "Its metal surface, though tarnished by its unexpected journey, glints with a sense of purpose.",
        "Use":()=>{
            if(inventory.Key.inInventory && currentRoom.value === environment.Room){
                environment.Room.interactables.Door.Use();
            }else {
                let newParagraph = {};
                newParagraph.innerHTML = `You no fitting keyhole for this key in this room.`;
                appendToOutput(newParagraph);
            }
        },
        "Examine": ()=>{
            let newParagraph = {};
            newParagraph.innerHTML = inventory.Key.description;
            appendToOutput(newParagraph);
        },
        "Look at": () =>{
            inventory.Key.Examine();
        }
    },
    "Note": {
        name: "Note",
        inInventory: false,
        text: `Key Inside`,
        location: environment.Room.Table,
        description: "Its message, cryptic yet imperative, suggests a path forward or a secret to uncover, serving as a silent guide in your solitary journey.",
    },
    "Simple Meal": {
        name: "Simple Meal",
        inInventory: false,
        used: false,
        description: "It is straightforward in its appearance, with no pretense or complexity, yet there is an underlying assurance of nourishment. The simplicity of its composition, clear and devoid of excess, speaks to a basic yet profound fulfillment. This meal, unassuming in its essence, promises satisfaction in its simplicity, offering a momentary respite from the harshness of your surroundings, with a subtle invitation to partake in its quiet sustenance.",
        "Examine": () => {
            inventory["Simple Meal"]["Look at"]();
        },
        "Look at": () => {
            let newParagraph = {};
            newParagraph.innerHTML = inventory["Simple Meal"].description;
            appendToOutput(newParagraph);
        },
        "Use": () => {
            if (player.isHungry) {
                let newParagraph = {};
                newParagraph.innerHTML = 'Upon consuming the meal you\'ve prepared with care, a sense of well-being washes over you. The flavors, though basic, are exactly what you needed, filling you with warmth and satisfaction. The act of eating, simple as it is, momentarily lifts the weight of your circumstances, allowing a brief respite in the quiet. As you finish, a comfortable fullness takes over, and your eyelids grow heavy, suggesting that perhaps it\'s time to rest and digest this unexpected, yet welcome, comfort.';
                appendToOutput(newParagraph);
                newParagraph.innerHTML = `REMOVED FROM INVENTORY: ${inventory["Simple Meal"].name}`;
                appendToOutput(newParagraph);
                inventory["Simple Meal"].inInventory = false;
                inventory["Simple Meal"].used = true;
                player.isHungry = false;
                player.inStomach = inventory["Simple Meal"];
            } else {
                let newParagraph = {};
                newParagraph.innerHTML = 'You are not hungry yet. Maybe later.';
                appendToOutput(newParagraph);
            }
        },
        "Eat":()=>{
            inventory["Simple Meal"].Use();
        }
    },
    "Sacrilegious Meal": {
        name: "Sacrilegious Meal",
        inInventory: true,
        used: false,
        description: "As you gaze upon this meal, its grotesque assembly assaults your senses. The colors are unnaturally vivid, clashing in a way that seems to wage war against your appetite. The stench hits you like a physical force, a miasma of rot and spoilage that clings to the air, daring you to take a closer look. Its composition, a mishmash of what should have never been combined, promises nothing but regret.",
        "Examine": () => {
            inventory["Sacrilegious Meal"]["Look at"]();
        },
        "Look at": () => {
            let newParagraph = {};
            newParagraph.innerHTML = inventory["Sacrilegious Meal"].description;
            appendToOutput(newParagraph);
        },
        "Use": () => {
            if (player.isHungry) {
                let newParagraph = {};
                newParagraph.innerHTML = `As you consume the meal concocted from spoiled ingredients, discomfort quickly sets in. The off-putting textures and the overwhelming, unpleasant flavors make every bite a challenge. Despite your hunger, regret fills you with each swallow. Shortly after finishing, a feeling of unease grows within you, hinting at the digestive turmoil that awaits. It\'s a harsh reminder of the risks taken when desperation guides your choices.</br></br><ins>This may haunt you later...</ins>`;
                appendToOutput(newParagraph);
                newParagraph.innerHTML = `REMOVED FROM INVENTORY: ${inventory["Sacrilegious Meal"].name}`;
                appendToOutput(newParagraph);
                inventory["Sacrilegious Meal"].inInventory = false;
                inventory["Sacrilegious Meal"].used = true;
                player.isHungry = false;
                player.inStomach = inventory["Sacrilegious Meal"];
            } else {
                let newParagraph = {};
                newParagraph.innerHTML = 'You are not hungry yet. Maybe later.';
                appendToOutput(newParagraph);
            }
        },
        "Eat":()=>{
            inventory["Sacrilegious Meal"].Use();
        }
    },
    "Good Ingredients": {
        name: "Good Ingredients",
        inInventory: false,
        used: false,
        description: "3 cans of ingredients. According to the label they are are a few months past their prime but you think they will suffice if you intend to cook something.",
        "Look at": () => {
            if (inventory["Good Ingredients"].inInventory || currentRoom.value === environment.Kitchen) {
                let newParagraph = {};
                newParagraph.innerHTML = inventory["Good Ingredients"].description;
                appendToOutput(newParagraph);
            }
        },
        "Examine": () => {
            inventory["Good Ingredients"]["Look at"]();
        },
        "Take": () => {
            if (!inventory["Good Ingredients"].inInventory) {
                let newParagraph = {};
                newParagraph.innerHTML = `You grab three metal cans from the shelf. They feel quite heavy.`;
                appendToOutput(newParagraph);
                newParagraph.innerHTML = `ADDED TO INVENTORY: ${inventory["Good Ingredients"].name}`;
                appendToOutput(newParagraph);
                inventory["Good Ingredients"].inInventory = true;
            }
        },
        "Use": () => {
            let newParagraph = {};
            if (inventory["Good Ingredients"].inInventory) {
                if (currentRoom.value.name === environment.Kitchen.name) {
                    newParagraph.innerHTML = `With a mix of hope and necessity driving your actions, you combine them on the stove, stirring occasionally. The aroma that fills the kitchen is comforting, a rare sensation in this desolate place. As the meal comes together, you feel a small sense of accomplishment. It's simple, but it's probably the best meal you've had in a while. You've prepared a Simple Meal, ready to be eaten when you need it most.`;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `ADDED TO INVENTORY: ${inventory["Simple Meal"].name}`;
                    inventory["Simple Meal"].inInventory = true;
                    inventory["Good Ingredients"].inInventory = false;
                    appendToOutput(newParagraph);
                } else {
                    newParagraph.innerHTML = `You probably could use them in the kitchen...`;
                    appendToOutput(newParagraph);
                }
            }
        },
        "Open": () => {
            if (inventory["Good Ingredients"].inInventory) {
                let newParagraph = {};
                newParagraph.innerHTML = `You peel off the lids. The content appears to be fresher than expected.`;
                appendToOutput(newParagraph);
            }
        }
    },
    "Spoiled Ingredients": {
        name: 'Spoiled Ingredients',
        inInventory: false,
        taken: false,
        used: false,
        description: "As you examine it, the mass from the fridge confronts you with its dismal state. It is an undefinable concoction, its original form lost to time and neglect. The colors have turned into unsettling shades, and the smell is overpowering, a stark reminder of decay. It is a gamble, holding potential danger as much as it does sustenance.",
        "Look at": () => {
            if (inventory["Spoiled Ingredients"].inInventory || (environment.Kitchen.interactables.Fridge.isOpen && !inventory["Spoiled Ingredients"].inInventory)) {
                let newParagraph = {};
                newParagraph.innerHTML = inventory["Spoiled Ingredients"].description;
                appendToOutput(newParagraph);
            }
        },
        "Examine": () => {
            inventory["Spoiled Ingredients"]["Look at"]();
        },
        "Take": () => {
            if (!inventory["Spoiled Ingredients"].taken) {
                let newParagraph = {};
                newParagraph.innerHTML = `You grab that thing with your hands.`;
                appendToOutput(newParagraph);
                newParagraph.innerHTML = `ADDED TO INVENTORY: ${inventory["Spoiled Ingredients"].name}`;
                appendToOutput(newParagraph);
                inventory["Spoiled Ingredients"].inInventory = true;
                inventory["Spoiled Ingredients"].taken = true;
            }
        },
        "Use": () => {
            let newParagraph = {};
            if (inventory["Spoiled Ingredients"].inInventory) {
                if (currentRoom.value.name === environment.Kitchen.name) {
                    newParagraph.innerHTML = `With the spoiled ingredients at your disposal, you hesitantly decide to proceed. Mixing them together, the unsettling sight and overpowering stench from the concoction almost make you second guess your decision. The result is a meal that could barely be called such, a grim testament to desperation. It now resides in your inventory, a stark reminder of the lengths you've gone to survive. This meal, while a grotesque assembly, may be consumed in dire times, but at what cost to your wellbeing?`;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `ADDED TO INVENTORY: ${inventory["Sacrilegious Meal"].name}`;
                    inventory["Sacrilegious Meal"].inInventory = true;
                    inventory["Spoiled Ingredients"].inInventory = false;
                    appendToOutput(newParagraph);
                } else {
                    newParagraph.innerHTML = `You probably could use them in the kitchen...`;
                    appendToOutput(newParagraph);
                }
            }
        }
    }
};