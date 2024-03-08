/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import { openImageModal } from "@utils/discord";
import definePlugin from "@utils/types";

const settings = definePluginSettings({});

export default definePlugin({
    name: "Open Image Command",
    description: "Adds a Shlash Command to open a Image Modal",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    commands: [
        {
            name: "image",
            description: "Opens a Image Modal",
            inputType: ApplicationCommandInputType.BOT,
            options: [{
                name: "URL",
                required: true,
                description: "The URL of the Image to Open",
                type: ApplicationCommandOptionType.STRING
            }],

            execute: async (args, ctx) => {
                const url = findOption<string>(args, "URL");

                openImageModal(url as string);
            }
        }

    ],
    settings,
    patches: [],
});
