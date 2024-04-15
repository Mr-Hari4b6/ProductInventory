// FloatingButtonStack.tsx

import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const actions = [
    {
        text: "Product Cost",
        icon: <Icon name='codepen' size={20} color="white" />,
        name: "bt_inventory",
        position: 2,
        navigate: (navigation: any) => navigation.navigate('ProductCost'),
    },
    {
        text: "Profile",
        icon: <Icon name='user' size={20} color="white" />,
        name: "Profile",
        position: 1,
        navigate: (navigation: any) => navigation.navigate('Profile')
    },
];

export const FloatingButton = () => {

    const navigation = useNavigation();

    return (
        <FloatingAction
            actions={actions}
            onPressItem={(name) => {
                const action = actions.find((act) => act.name === name);
                if (action) {
                    action.navigate(navigation);
                }
            }}
            floatingIcon={<Icon name="plus" size={24} color="white" />}
            distanceToEdge={{ vertical: 60, horizontal: 10 }}
            position='right'
        />
    );
};


