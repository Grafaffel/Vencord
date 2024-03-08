/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { NavContextMenuPatchCallback } from "@api/ContextMenu";
import { LinkIcon } from "@components/Icons";
import definePlugin from "@utils/types";
import { Clipboard, Menu } from "@webpack/common";
import type { Channel, User } from "discord-types/general";

interface UserContextProps {
    channel: Channel;
    guildId?: string;
    user: User;
}

const UserContextMenuPatch: NavContextMenuPatchCallback = (children, { user, guildId }: UserContextProps) => {
    if (!user) return;

    children.push(
        <Menu.MenuItem
            id="vc-copy-avatar-url"
            label="Copy Avatar URL"
            action={() => Clipboard.copy(user.getAvatarURL(guildId, { size: 1024 }, true))}
            icon={LinkIcon}
        />
    );
};

export default definePlugin({
    name: "CopyAvatarURLs",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    description: "Adds a 'Copy Avatar URL' option to the user context menu.",
    contextMenus: {
        "user-context": UserContextMenuPatch
    }
});
