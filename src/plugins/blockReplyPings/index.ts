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
import { enableStyle } from "@api/Styles";
import definePlugin, { OptionType } from "@utils/types";
import { findByProps } from "@webpack";

import noticeStyle from "./noticeStyle.css?managed";

const settings = definePluginSettings({
    showNotice: {
        type: OptionType.BOOLEAN,
        description: "Whether to show a notice next to the message",
        default: true,
        restartNeeded: true,
    },
});

function addNoticeStyles() {
    enableStyle(noticeStyle);
}

export default definePlugin({
    name: "BlockReplyPings",
    description: "Block Pings from reply's",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],

    settings,

    patches: [
        {
            find: "Message must not be a thread starter message",
            predicate() {
                return settings.store.showNotice;
            },
            replacement: [
                {
                    match: /\)\("li",\{(.+?),className:/,
                    replace: ")(\"li\",{$1,className:(arguments[0].message.content.includes('󠁰󠁩󠁮󠁧󠀠󠁢󠁬󠁯󠁣󠁫󠁥󠁤') ? \"ping-blocked \" : \"\")+"
                }
            ]
        },
    ],
    start() {
        addNoticeStyles();

        const currentUserId = findByProps("getCurrentUser").getCurrentUser().id;

        findByProps("addInterceptor").addInterceptor(e => {
            if (e.type === "MESSAGE_CREATE") {
                e.message.mentions.forEach(mention => {
                    if (mention.id === currentUserId && e.message.content.search(`<@${mention.id}>`) === -1) {
                        e.message.mentions = [];
                        e.message.content = "󠁰󠁩󠁮󠁧󠀠󠁢󠁬󠁯󠁣󠁫󠁥󠁤" + e.message.content;
                    }
                });
            }
        });
    }
});
