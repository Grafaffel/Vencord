/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { classNameFactory } from "@api/Styles";
import { Flex } from "@components/Flex";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize, openModalLazy } from "@utils/modal";
import { extractAndLoadChunksLazy, findByPropsLazy, findComponentByCode, LazyComponentWebpack } from "@webpack";
import { Button, Text } from "@webpack/common";
import React from "react";

const DecorationModalStyles = findByPropsLazy("modalFooterShopButton");
const cl = classNameFactory("vc-decor-");
const requireSettingsMenu = extractAndLoadChunksLazy(['name:"UserSettings"'], /createPromise:.{0,20}Promise\.all\((\[\i\.\i\(".+?"\).+?\])\).then\(\i\.bind\(\i,"(.+?)"\)\).{0,50}"UserSettings"/);

const QuestsContainer = LazyComponentWebpack(() => {
    const component = findComponentByCode(".questsContainer");
    return React.memo(component);
});

function QuestsModal(props: ModalProps) {

    return <ModalRoot
        {...props}
        size={ModalSize.SMALL}
        className={DecorationModalStyles.modal}
    >
        <ModalHeader separator={false} className={cl("modal-header")}>
            <Text
                color="header-primary"
                variant="heading-lg/semibold"
                tag="h1"
                style={{ flexGrow: 1 }}
            >
                Quests
            </Text>
            <ModalCloseButton onClick={props.onClose} />
        </ModalHeader>
        <ModalContent
            scrollbarType="none"
        >
        </ModalContent>
        <Flex style={{ padding: "1rem" }}>
            <QuestsContainer />
        </Flex>
        <ModalFooter>
            <Button
                onClick={() => {
                    props.onClose();
                }}
            >
                Close
            </Button>
        </ModalFooter>
    </ModalRoot >;
}

export const openQuestsModal = () =>
    openModalLazy(async () => {
        await requireSettingsMenu();
        return modalProps => <QuestsModal {...modalProps} />;
    });
