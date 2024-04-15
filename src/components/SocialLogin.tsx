import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";

export const SocialLogins = () => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <TouchableOpacity
                onPress={() => console.log("Pressed")}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10
                }}
            >
                <Icon
                    name='facebook'
                    size={30}
                    style={{
                        height: 30,
                        width: 20,
                        marginRight: 8
                    }}
                    color='blue'
                />

                <Text style={{ fontWeight: '500', color: 'black' }}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => console.log("Pressed")}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10
                }}
            >
                <Icon
                    name='google'
                    size={30}
                    style={{
                        height: 30,
                        width: 30,
                        marginRight: 8
                    }}
                    color='red'
                />

                <Text style={{ fontWeight: '500', color: 'black' }}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => console.log("Pressed")}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10
                }}
            >
                <Icon
                    name='twitter'
                    size={30}
                    style={{
                        height: 30,
                        width: 30,
                        marginRight: 8
                    }}
                    color='blue'
                />
                <Text style={{ fontWeight: '500', color: 'black' }}>Titter</Text>
            </TouchableOpacity>
        </View>
    );
};