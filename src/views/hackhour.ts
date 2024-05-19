import {prisma} from "../app.js";
import {View} from "@slack/bolt";
import {Picnics} from "../subroutines/events/picnics.js";

export const Callbacks = {
    START: 'start',
}

export const Actions = {
    GOALS: 'goals',
    PICNICS: 'picnics'
}

export class Views {
    public static async start(userId: string): Promise<View> {
        const userData = await prisma.user.findUnique({
            where: {
                slackId: userId
            }
        });

        if (!userData) {
            throw new Error("User not found");
        }

        const goalData = await prisma.goals.findUnique({
            where: {
                goalId: userData.selectedGoal
            }
        });

        const picnicName = Picnics.find((picnic) => picnic.ID === userData.eventId)?.NAME;

        return {
            "callback_id": Callbacks.START,
            "title": {
                "type": "plain_text",
                "text": "Start a Session",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "type": "modal",
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": true,
                        "action_id": "session"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Label",
                        "emoji": true
                    },
                    "block_id": "session"
                },
                {
                    "type": "input",
                    "element": {
                        "type": "number_input",
                        "is_decimal_allowed": false,
                        "action_id": "minutes",
                        "initial_value": "60",
                        "min_value": "1",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "How long will it be?",
                        "emoji": true
                    },
                    "block_id": "minutes"
                },
                {
                    "type": "input",
                    "block_id": "files",
                    "label": {
                        "type": "plain_text",
                        "text": "Upload Files"
                    },
                    "element": {
                        "type": "file_input",
                        "action_id": "files",
                        "filetypes": [
                            "jpg",
                            "png"
                        ],
                        "max_files": 5,
                    },
                    "optional": true
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Currently selected goal:* ${goalData?.goalName || 'None'}`
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "View Goals",
                            "emoji": true
                        },
                        "value": "goals",
                        "action_id": Actions.GOALS
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Current picnic:* ${picnicName || 'None'}`
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "View Picnics",
                            "emoji": true
                        },
                        "value": "picnics",
                        "action_id": Actions.PICNICS
                    }
                }
            ]
        }
    }
}