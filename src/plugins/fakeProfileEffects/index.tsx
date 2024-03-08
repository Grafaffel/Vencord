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
import definePlugin, { OptionType } from "@utils/types";
import { findByCodeLazy, findByProps } from "@webpack";
import { Button, FluxDispatcher } from "@webpack/common";

import { openEffectModal } from "./components/modals/ChangeEffectModal";

export const cl = classNameFactory("vc-fake-effects-");
const CustomizationSection = findByCodeLazy(".customizationSectionBackground");

export const settings = definePluginSettings({
    profileEffect: {
        type: OptionType.STRING,
        description: "The Profile Effect",
        onChange(newValue) {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = newValue;
        },
        hidden: true
    }
});

export default definePlugin({
    name: "Fake Profile Effects",
    description: "Show a Profile Effect on you Profile. This is just visuble to you!",
    authors: [
        {
            id: 766966090579836948n,
            name: "Grafaffel",
        },
    ],
    settings,
    patches: [
        {
            find: "DefaultCustomizationSections",
            replacement: {
                match: /(?<={user:\i},"decoration"\),)/,
                replace: "$self.FakeEffectSection(),"
            }
        },
    ],

    start() {
        findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;

        const ProfileEffectInvervall = setInterval(() => {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
        }, 5000);

        FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
    },
    stop() { },
    flux: {
        POPOUT_WINDOW_OPEN: () => {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
        },

        CURRENT_USER_UPDATE: () => {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
        },

        CONNECTION_OPEN: () => {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
        },
        START_SESSION: () => {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
        },
        PROFILE_CUSTOMIZATION_OPEN_PREVIEW_MODAL: () => {
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
        },
        APP_STATE_UPDATE: () => {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
        },
        USER_SETTINGS_MODAL_OPEN: () => {
            findByProps("getUserProfile").getUserProfile(findByProps("getCurrentUser").getCurrentUser().id).profileEffectId = settings.store.profileEffect;
            FluxDispatcher.dispatch({ type: "CURRENT_USER_UPDATE" });
        }
    },

    FakeEffectSection: ErrorBoundary.wrap(function () {
        return <CustomizationSection title={"Fake Effects"}>
            <Flex>
                <Button size={Button.Sizes.SMALL} onClick={() => {
                    openEffectModal();
                }}>
                    Change Fake Effect
                </Button>
            </Flex>
        </CustomizationSection>;
    }, { noop: true }),
});
