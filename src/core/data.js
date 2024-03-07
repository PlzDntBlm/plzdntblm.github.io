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
    "Drop": {
        needsParameter: true,
        acceptsParameter: true,
        description: "Remove an item from your inventory and leave it at your current location."
    },
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
    hasEaten: false
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
            let newParagraph = {};
            newParagraph.innerHTML = `Concrete walls. No windows. Three doors:</br>One metal door - probably leading outside.</br>A white wooden door - a sign: Kitchen.</br>Another white door with a silver symbol - a child peeing into a pot. The bathroom?</br></br>In one corner stands the simple wooden bed with the dirty mattress you have slept on.</br>Centered: a wooden table.`;
            newParagraph.image = './src/assets/images/Room.png';
            appendToOutput(newParagraph);
        },
        "Examine": () => {
            environment.Room["Look around"]();
        },
        interactables: {
            Door: {
                unlocked: false,
                open: false,
                "Unlock door": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `You stick the key into the doors lock,</br>turn it around...</br></br> CLICK!</br></br>The door is unlocked.</br>You throw the key away.`;
                    this.unlocked = true;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `REMOVED FROM INVENTORY: Key`;
                    inventory.Key.inInventory = false;
                    appendToOutput(newParagraph);
                },
                "Exit door": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `The door that kept you from freedom swings open.</br>Sun's bright light strikes your eyes.</br>You leave this reeking place.</br></br>You have won - but at what price?`;
                    appendToOutput(newParagraph);
                },
                "Look at": () => {
                    environment.Room.interactables.Door.Examine();
                },
                "Examine": () => {
                    let newParagraph = {};
                    // door closed, door locked, no key
                    if (environment.Room.interactables.Door.open === false && !environment.Room.interactables.Door.unlocked === false && !inventory.Key.inInventory === false) {
                        newParagraph.innerHTML = "The door that seems to lead outside doesn't appear to move. It is locked.";
                        appendToOutput(newParagraph);
                    }
                    // door closed, door locked, has key
                    if (environment.Room.interactables.Door.open === false && !environment.Room.interactables.Door.unlocked === false && !inventory.Key.inInventory === true) {
                        newParagraph.innerHTML = "The door is locked. But maybe you have something you could use...";
                        appendToOutput(newParagraph);
                    }
                    // door closed, door unlocked, has key
                    if (environment.Room.interactables.Door.open === false && !environment.Room.interactables.Door.unlocked === true) {
                        newParagraph.innerHTML = "You stand in front of the unlocked but shut metal door.";
                        appendToOutput(newParagraph);
                    }
                },
                "Use": () => {
                    let newParagraph = {};
                    // door closed, door locked, no key
                    if (this.open === false && !this.unlocked === false && !inventory.Key.inInventory === false) {
                        newParagraph.innerHTML = "You pull the handle. The door doesn't move.";
                        appendToOutput(newParagraph);
                    }
                    // door closed, door locked, has key
                    if (this.open === false && !this.unlocked === false && !inventory.Key.inInventory === true) {
                        this["Unlock door"]();
                    }
                    // door closed, door unlocked, has key
                    if (this.open === false && !this.unlocked === true) {
                        this["Exit door"]();
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
                    newParagraph.innerHTML = `There appears to be nothing interesting about this common wooden table.</br>Four legs, a plate.</br>But something catches your eye: There is a single sheet of paper visibly placed on it.`;
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
                    let newParagraph = {};
                    if (player.isTired) {
                        if (player.hasEaten) {
                            newParagraph.innerHTML = `The weight of your full stomach pulls you down into an uneasy slumber on the stained mattress, enveloping you in its damp embrace. The filth doesn't bother you as much as the unsettling fullness within.`;
                            appendToOutput(newParagraph);
                            player.isTired = false;

                            newParagraph.innerHTML = `A distressing churn in your belly awakens you, a dire need clawing at your insides. It is unmistakable; the urge to relieve yourself is overwhelming, signaling the onset of an unfortunate digestive rebellion.`;
                            appendToOutput(newParagraph);
                            player.hasDiarrhea = true;
                        } else {
                            newParagraph.innerHTML = `You collapse onto the mattress, your body eventually succumbing to sleep despite the grime. The brief escape from reality is punctuated by a hollow growl from your stomach upon waking, a stark reminder of your neglect.`;
                            player.isHungry = true;
                            player.isTired = false;
                            appendToOutput(newParagraph);
                        }
                    } else {
                        newParagraph.innerHTML = "The call to rest eludes you, leaving you in a state of wary alertness amidst the room's unyielding discomfort.";
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
            newParagraph.innerHTML = "You walk into the kitchen. The door was not locked.";
            currentRoom.set(environment.Kitchen);
            appendToOutput(newParagraph);
        },
        "Exit": () => {
            environment.Room.Enter();
        },
        "Look at": () => {
            this["Look around"]();
        },
        "Look around": () => {
            let newParagraph = {};
            newParagraph.innerHTML = "The kitchen consists of a counter, sink, fridge, several cooking utensils, a knife, and a shelf filled with items. The fridge hums quietly, promising ingredients that may or may not be past their prime.";
            newParagraph.image = "./src/assets/images/Kitchen.png";
            appendToOutput(newParagraph);
        },
        "Examine": () => {
            environment.Kitchen["Look around"]();
        },
        "Use": () => {
            environment.Kitchen.Cook();
        },
        "Cook": () => {
            let newParagraph = {};
            // Check for ingredients in the inventory
            if (inventory.Ingredients.inInventory) {
                if (inventory.Ingredients.type === "Good") {
                    newParagraph.innerHTML = "You decide to cook using the good ingredients you have found. The process is uneventful, but the result is a surprisingly decent meal, nourishing and safe.";
                    appendToOutput(newParagraph);
                    // Optionally, remove ingredients from inventory after use
                } else if (inventory.Ingredients.type === "Bad") {
                    newParagraph.innerHTML = "The dubious quality of the ingredients you have chosen does not bode well. The meal you prepare looks unappetizing. Eating this is a risky gamble.";
                    appendToOutput(newParagraph);
                    player.hasDiarrhea = true; // Induce diarrhea condition
                    // Optionally, remove ingredients from inventory after use
                }
            } else {
                newParagraph.innerHTML = "You have nothing to cook with. The kitchen, despite its promise, remains idle.";
                appendToOutput(newParagraph);
            }
        },
        "Knife": {
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
        },
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
                    newParagraph.innerHTML = `Smudges and mold cover the once smooth white surface of the humming device.`;
                    appendToOutput(newParagraph);
                },
                "Look at": () => {
                    environment.Kitchen.interactables.Fridge.Examine();
                },
                "Take": () => {
                    if (environment.Kitchen.interactables.Fridge.isOpen && !inventory["Spoiled Ingredients"].inInventory) {
                        inventory["Spoiled Ingredients"].Take();
                    } else if (!environment.Kitchen.interactables.Fridge.isOpen) {
                        environment.Kitchen.interactables.Fridge.Open();
                    } else {
                        environment.Kitchen.interactables.Fridge.Lift();
                    }
                },
                "Use": () => {
                    console.log("ope");
                    environment.Kitchen.interactables.Fridge.Take();
                },
                "Open": () => {
                    if (!environment.Kitchen.interactables.Fridge.isOpen) {
                        let newParagraph = {};
                        newParagraph.innerHTML = `There is a nasty wet sound as the mold between the rims of the door rips apart. A weird stench hits your nostrils. There is something inside.`;
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
                "Examine": () => {
                    let newParagraph = {};
                    newParagraph.innerHTML = `A dusty wooden contraption. Besides some less relevant looking things there is something that catches your eye: Some metal cans.`;
                    appendToOutput(newParagraph);
                },
                "Look at": () => {
                    environment.Kitchen.interactables.Shelf.Examine();
                },
                "Take": () => {
                    if (!inventory["Good Ingredients"].inInventory) {
                        inventory["Good Ingredients"].Take();
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
            newParagraph.innerHTML = "You walk into the bathroom. The door was not locked.";
            currentRoom.set(environment.Bathroom);
            appendToOutput(newParagraph);
        },
        "Exit": () => {
            environment.Room.Enter();
        },
        "Look at": () => {
            environment.Bathroom["Look around"]();
        },
        "Look around": () => {
            let newParagraph = {};
            newParagraph.innerHTML = "Within the dirty old bathroom you find the classic toilet, a scratched up ceramic sink and a shelf.";
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
                        newParagraph.innerHTML = `In a moment of desperation, you use the toilet. The ordeal is as quick as it is unpleasant. After the deed is done, a sense of relief washes over you, but as you stand up, you notice a metallic clink among the turmoil below. The key!`;
                        appendToOutput(newParagraph);
                        environment.Bathroom.interactables.Toilet.used = true; // Mark the toilet as used
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
        inInventory: false,
        description: "Its metal surface, though tarnished by its unexpected journey, glints with a sense of purpose."
    },
    "Note": {
        name: "Note",
        inInventory: false,
        text: `Key Inside`,
        location: environment.Room.Table,
        description: "Its message, cryptic yet imperative, suggests a path forward or a secret to uncover, serving as a silent guide in your solitary journey."
    },
    "Simple Meal": {
        name: "Simple Meal",
        inInventory: false,
        used: false,
        description: "It is straightforward in its appearance, with no pretense or complexity, yet there is an underlying assurance of nourishment. The simplicity of its composition, clear and devoid of excess, speaks to a basic yet profound fulfillment. This meal, unassuming in its essence, promises satisfaction in its simplicity, offering a momentary respite from the harshness of your surroundings, with a subtle invitation to partake in its quiet sustenance."
    },
    "Sacrilegious Meal": {
        name: "Sacrilegious Meal",
        inInventory: false,
        used: false,
        description: "As you gaze upon this meal, its grotesque assembly assaults your senses. The colors are unnaturally vivid, clashing in a way that seems to wage war against your appetite. The stench hits you like a physical force, a miasma of rot and spoilage that clings to the air, daring you to take a closer look. Its composition, a mishmash of what should have never been combined, promises nothing but regret."
    },
    "Good Ingredients": {
        name: "Good Ingredients",
        inInventory: false,
        used: false,
        description: "3 cans of ingredients. According to the label they are are a few months past their prime but you think they will suffice if you intend to cook something.",
        "Look at": () => {
            if (inventory["Good Ingredients"].inInventory) {
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
                if(currentRoom.value.name === environment.Kitchen.name){
                    newParagraph.innerHTML = `With a mix of hope and necessity driving your actions, you combine them on the stove, stirring occasionally. The aroma that fills the kitchen is comforting, a rare sensation in this desolate place. As the meal comes together, you feel a small sense of accomplishment. It's simple, but it's probably the best meal you've had in a while. You've prepared a Simple Meal, ready to be eaten when you need it most.`;
                    appendToOutput(newParagraph);
                    newParagraph.innerHTML = `ADDED TO INVENTORY: ${inventory["Simple Meal"].name}`;
                    inventory["Simple Meal"].inInventory = true;
                    inventory["Good Ingredients"].inInventory = false;
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
            if (!inventory["Spoiled Ingredients"].inInventory) {
                let newParagraph = {};
                newParagraph.innerHTML = `You grab that thing with your hands.`;
                appendToOutput(newParagraph);
                newParagraph.innerHTML = `ADDED TO INVENTORY: ${inventory["Spoiled Ingredients"].name}`;
                appendToOutput(newParagraph);
                inventory["Spoiled Ingredients"].inInventory = true;
            }
        },
        "Use": () => {
            if (inventory["Spoiled Ingredients"].inInventory) {

            }
        }
    }
};