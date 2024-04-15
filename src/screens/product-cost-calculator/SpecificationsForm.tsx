import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomModal from "../../components/CustomModal";
import { Specifications } from "./types";
import { specificationsFormFields } from "./fields";
import Icon from "react-native-vector-icons/FontAwesome";
import { DataTable, Button } from "react-native-paper";
import DeleteModal from "../../components/DeleteModal";

interface SpecificationsDetailsFormProps {
    details: Specifications[];
    setDetails: React.Dispatch<React.SetStateAction<Specifications[]>>;
}
export const SpecificationsForm = ({ details, setDetails }: SpecificationsDetailsFormProps) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<any>(null);

    // Function to handle saving the form data
    const handleSave = (data: any) => {
        console.log('Data:', data);
        //setDetails(data);
        setSelectedRow(null);
        setModalVisible(false);
    };

    // Function to handle canceling the modal
    const handleCancel = () => {
        setModalVisible(false);
    };
    const [selectedRow, setSelectedRow] = useState<Specifications | null>(null);

    const handleDelete = () => {
        if (rowToDelete) {
            const updatedDetails = details.filter((item) => item !== rowToDelete);
            setDetails(updatedDetails);
            setShowDeleteModel(false);
            setRowToDelete(null);
        }
    };

    return (
        <View style={styles.section}>
            {details.length > 0 &&
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Color</DataTable.Title>
                        <DataTable.Title>Weight</DataTable.Title>
                        <DataTable.Title>Height</DataTable.Title>
                        <DataTable.Title>Width</DataTable.Title>
                        <DataTable.Title>Units</DataTable.Title>
                        <DataTable.Title>Edit</DataTable.Title>
                        <DataTable.Title>Delete</DataTable.Title>
                    </DataTable.Header>

                    {details.map((spec, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{spec.color}</DataTable.Cell>
                            <DataTable.Cell>{spec.weight}</DataTable.Cell>
                            <DataTable.Cell>{spec.height}</DataTable.Cell>
                            <DataTable.Cell>{spec.width}</DataTable.Cell>
                            <DataTable.Cell>{spec.quantity}</DataTable.Cell>
                            <DataTable.Cell>
                                <Button
                                    onPress={() => {
                                        setRowToDelete(spec);
                                        setShowDeleteModel(true);
                                    }}
                                    mode="text"
                                    //buttonColor='red'
                                    textColor='red'
                                    icon='delete'
                                    children={undefined}
                                    style={{ height: 40, width: 50 }}
                                />
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <Button
                                    onPress={() => {
                                        setSelectedRow(spec);
                                        setModalVisible(true);
                                    }}
                                    mode="text"
                                    textColor='blue'
                                    icon='pen'
                                    children={undefined}
                                    style={{ height: 40, width: 50 }}
                                />
                            </DataTable.Cell>

                        </DataTable.Row>
                    ))}
                </DataTable>}

            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Specifications Details</Text>
                <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>

            <CustomModal
                details={details}
                setDetails={setDetails}
                fields={specificationsFormFields}
                onCancel={handleCancel}
                onSave={handleSave}
                visible={modalVisible}
                initialData={selectedRow}
            />
            {showDeleteModel && <DeleteModal
                visible={showDeleteModel}
                onCancel={() => setShowDeleteModel(!showDeleteModel)}
                onDelete={handleDelete}
            />}
        </View>
    );

};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 5
    },
    specificationsContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'purple'
    },
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
    },
    value: {
        flex: 2,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'purple',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        marginRight: 10,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    editButtonText: {
        color: '#fff',
        marginRight: 10,
    },
});