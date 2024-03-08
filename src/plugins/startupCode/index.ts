/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    startCode: {
        type: OptionType.STRING,
        description: "The Code to run at Startup.",
        placeholder: "console.log('Hello World!')"
    }
});

export default definePlugin({
    name: "Startup Code",
    description: "Run JavaScript on Startup",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    settings,
    patches: [],
    start() {
        eval(settings.store.startCode as string);
    },
    stop() { },
});
