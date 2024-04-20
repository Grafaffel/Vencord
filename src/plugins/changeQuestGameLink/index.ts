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
    name: "ChangeQuestGameLink",
    description: "Changes the Quest Game Link to something else.",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        }
    ],

    settings: definePluginSettings({
        gameLink: {
            type: OptionType.STRING,
            description: "The text to replace the Link to the Quests's Game with.",
            default: "https://www.google.com/",
            restartNeeded: true,
        },
    }),

    patches: [
        {
            find: "default.Messages.QUESTS_PLAY_GAME",
            replacement: {
                match: /(e\.quest\.config\.getGameLink)/,
                replace: "$self.settings.store.gameLink"
            }
        }
    ],
});
