/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption, sendBotMessage } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    showResult: {
        type: OptionType.BOOLEAN,
        description: "Whether to show a Message containing the Result"
    }
});

export default definePlugin({
    name: "EvalCommand",
    description: "Adds a Eval Slash Command (WARNING: DON'T RUN CODE FROM UNTRUSTED SOURCES!)",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    commands: [
        {
            name: "eval",
            description: "Runs JavaScript on the Client",
            inputType: ApplicationCommandInputType.BOT,
            options: [{
                name: "code",
                required: true,
                description: "The Code to Run",
                type: ApplicationCommandOptionType.STRING
            }],

            execute: async (args, ctx) => {
                const codeToRun = findOption<string>(args, "code");

                const indirectEval = eval;

                const codeResult = indirectEval(codeToRun as string);

                if (settings.store.showResult === true) {
                    sendBotMessage(ctx.channel.id, {
                        content: `\`\`\`${codeResult}\`\`\``
                    });
                }
            }
        }

    ],
    settings,
    patches: [],
});
