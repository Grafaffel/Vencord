/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "UploadAnySticker",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    description: "Adds a 'Copy Avatar URL' option to the user context menu.",
    patches: [
        {
            find: "Messages.GUILD_STICKER_UPLOAD_RELATED_EMOJI_TITLE,",
            replacement: {
                match: /,multiple: !1,filters: (\i)/,
                replace: "$1.[{name: 'Sticker file', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'webm']}]",
            }
        }
    ]
});
