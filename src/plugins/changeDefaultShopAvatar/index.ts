/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { findByProps } from "@webpack";

const settings = definePluginSettings({
    useCurrentAvatar: {
        type: OptionType.BOOLEAN,
        description: "Whether to use the current avatar as the placeholder avatar",
        default: true,
        restartNeeded: true,
    },
    newAvatarURL: {
        type: OptionType.STRING,
        description: "URL to the new shop avatar",
        default: "https://canary.discord.com/assets/f6c7b8245d3a54cf98b2.png",
        restartNeeded: true,
    }
});

export default definePlugin({
    name: "ChangeShopAvatar",
    description: "Change the default shop avatar to a custom one.",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
        {
            id: 235834946571337729n,
            name: "Nuckyz",
        },
    ],

    settings,

    patches: [
        {
            find: ".getIsProductNew(",
            predicate() {
                return !settings.store.useCurrentAvatar;
            },
            replacement: {
                match: /(?<=\.avatarContainer,.+?src:).+?(?=,)/,
                replace: "$self.settings.store.newAvatarURL",
            }
        },
        {
            find: ".getIsProductNew(",
            predicate() {
                return settings.store.useCurrentAvatar;
            },
            replacement: {
                match: /(?<=\.avatarContainer,.+?src:).+?(?=,)/,
                replace: "$self.getAvatarURL()",
            }
        },
    ],

    getAvatarURL: () => {
        return `https://cdn.discordapp.com/avatars/${findByProps("getCurrentUser").getCurrentUser().id}/${findByProps("getCurrentUser").getCurrentUser().avatar}.webp`;
    }
});
