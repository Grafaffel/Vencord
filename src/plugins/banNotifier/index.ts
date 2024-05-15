/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showNotification } from "@api/Notifications";
import { definePluginSettings } from "@api/Settings";
import { openUserProfile } from "@utils/discord";
import definePlugin from "@utils/types";
import { findByProps } from "@webpack";

const settings = definePluginSettings({

});

interface BanEvent {
    "type": string,
    "guildId": string,
    "user": {
        "avatar": string,
        "bot": boolean,
        "clan": string,
        "discriminator": string,
        "id": string,
        "username": string,
        "publicFlags": number,
        "avatarDecorationData": object,
        "globalName": string;
    };
}

export default definePlugin({
    name: "BanNotifier",
    description: "Notifies you when a user gets banned",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    settings,
    flux: {
        GUILD_BAN_ADD: (event: BanEvent) => {
            console.log(event);
            showNotification({
                onClick: () => {
                    findByProps("transitionToGuildSync").transitionToGuildSync(event.guildId);
                    openUserProfile(event.user.id);
                },
                title: "User Banned",
                body: `${event.user.username} has been banned from ${findByProps("getGuildCount").getGuild(event.guildId).name}`,
                icon: `https://cdn.discordapp.com/avatars/${event.user.id}/${event.user.avatar}.webp?size=128`,

            });
        }
    }
});
