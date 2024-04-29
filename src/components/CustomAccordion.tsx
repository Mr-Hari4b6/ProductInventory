import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

type CustomAccordionProps<T> = {
    title: string;
    details: T[];
}
export const CustomAccordion = ({ title, details }: CustomAccordionProps<any>) => {

    const keys = details?.length > 0 ? Object.keys(details[0]) : [];
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };
    return (
        <View style={styles.detailsContainer}>
            <TouchableOpacity onPress={toggleAccordion} style={styles.detailsHeader}>
                <Text style={styles.detailsTitle}>{title}</Text>
                <Icon name={expanded ? 'caret-up' : 'caret-down'} size={26} color="black" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.detailsContent}>
                    <DataTable>
                        <DataTable.Header>
                            {keys.map((key, index) => (
                                <DataTable.Title key={index} style={{shadowColor:'black'}}>{key.toUpperCase()}</DataTable.Title>
                            ))}
                        </DataTable.Header>

                        {details?.map((item, rowIndex) => (
                            <DataTable.Row key={rowIndex}>
                                {keys.map((key, colIndex) => (
                                    <DataTable.Cell key={colIndex}>{item[key].toUpperCase()}</DataTable.Cell>
                                ))}
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        marginTop: 10,
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    detailsContent: {
        marginTop: 5,
    }
});