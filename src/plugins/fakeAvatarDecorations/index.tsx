/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import { definePluginSettings } from "@api/Settings";
import { classNameFactory } from "@api/Styles";
import ErrorBoundary from "@components/ErrorBoundary";
import { Flex } from "@components/Flex";
import definePlugin, { OptionType, StartAt } from "@utils/types";
import { findByCodeLazy, findByProps } from "@webpack";
import { Button, FluxDispatcher } from "@webpack/common";

import { openTestModal } from "./components/modals/TestModal";
import { decorations } from "./constants";

export const cl = classNameFactory("vc-fake-decorations-");
const CustomizationSection = findByCodeLazy(".customizationSectionBackground");

export const settings = definePluginSettings({
    avatarDecoration: {
        type: OptionType.SELECT,
        description: "The Decoration",
        onChange(newValue) {
            findByProps("getCurrentUser").getCurrentUser().avatarDecorationData = { asset: newValue };
        },
        options: decorations,
    }
});

export default definePlugin({
    name: "Fake Avatar Decorations",
    description: "Show a Avatar Decoration on you Profile. This is just visuble to you!",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    settings,
    startAt: StartAt.WebpackReady,
    patches: [
        {
            find: "DefaultCustomizationSections",
            replacement: {
                match: /(?<={user:\i},"decoration"\),)/,
                replace: "$self.FakeDecorationSection(),"
            }
        },
    ],

    start() {
        findByProps("_dispatch").addInterceptor(e => {
            if (e.type === "CURRENT_USER_UPDATE" || e.type === "CONNECTION_OPEN") e.user = Object.assign(findByProps("getUserStoreVersion").getUser(findByProps("getCurrentUser").getCurrentUser().id), { avatarDecoration: { asset: settings.store.avatarDecoration } });
        });

        FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
    },
    stop() { },
    flux: {
        POPOUT_WINDOW_OPEN: () => {
            findByProps("getCurrentUser").getCurrentUser().avatarDecorationData = { asset: settings.store.avatarDecoration };
        },

        CURRENT_USER_UPDATE: () => {
            findByProps("getCurrentUser").getCurrentUser().avatarDecorationData = { asset: settings.store.avatarDecoration };
        },

        CONNECTION_OPEN: () => {
            findByProps("getCurrentUser").getCurrentUser().avatarDecorationData = { asset: settings.store.avatarDecoration };
        },
        START_SESSION: () => {
            findByProps("getCurrentUser").getCurrentUser().avatarDecorationData = { asset: settings.store.avatarDecoration };
        }
    },

    FakeDecorationSection: ErrorBoundary.wrap(function () {
        return <CustomizationSection title={"Fake Decorations"}>
            <Flex>
                <Button size={Button.Sizes.SMALL} onClick={() => {
                    openTestModal();
                }}>
                    Change Fake Decoration
                </Button>
            </Flex>
        </CustomizationSection>;
    }, { noop: true }),
});
