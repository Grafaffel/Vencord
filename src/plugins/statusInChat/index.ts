/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    showMobile: {
        type: OptionType.BOOLEAN,
        description: "Whether to show the mobile indicator in chat",
    }
});

export default definePlugin({
    name: "StatusInChat",
    description: "Shows the Status of Users in Chat",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    settings,
    patches: [
        {
            find: "AnimatedAvatar",
            replacement: {
                match: "Avatar",
                replace: "Button",
            }
        }
    ],
});
