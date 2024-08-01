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

export default definePlugin({
    name: "New Here Text Changer",
    description: "Changes the New Member text to something else.",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
        {
            id: 976176454511509554n,
            name: "Sam",
        },
    ],

    settings: definePluginSettings({
        newHereText: {
            type: OptionType.STRING,
            description: "The text to replace the default new member text with.",
            default: "I'm new here, say hi!",
            restartNeeded: true,
        },
        popupText: {
            type: OptionType.STRING,
            description: "The text to replace the text in the popout with.",
            default: "System icon for new server members.",
            restartNeeded: true,
        }
    }),

    patches: [
        {
            find: "NewUserLargeIcon",
            replacement: {
                match: "I\\'m new here, say hi!",
                replace: "$self.settings.store.newHereText"
            }
        },
        {
            find: "NEW_MEMBER_BADGE_POPOUT_TEXT",
            replacement: {
                match: "System icon for new server members.",
                replace: "$self.settings.store.popupText"
            }
        },
    ],
});
