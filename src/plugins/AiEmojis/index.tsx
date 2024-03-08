/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import definePlugin from "@utils/types";

export const settings = definePluginSettings({
});

export default definePlugin({
    name: "AI Emojis",
    description: "Generate AI Emojis",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ], // Add a comma here

    settings,
    commands: [
        {
            name: "emoji",
            description: "Generate an AI Emoji",
            inputType: ApplicationCommandInputType.BOT,
            options: [{
                name: "prompt",
                description: "The Prompt for the AI to generate an Emoji from",
                required: true,
                type: ApplicationCommandOptionType.STRING
            }],

            execute: async (args, ctx) => {
                const thePrompt = findOption<string>(args, "prompt");

                const response = await fetch("https://grafaffel-apple-emoji.hf.space/run/predict", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        data: [
                            thePrompt,
                        ]
                    })
                });

                const data = await response.json();

                console.log(data);
            },
        },

    ],
});
