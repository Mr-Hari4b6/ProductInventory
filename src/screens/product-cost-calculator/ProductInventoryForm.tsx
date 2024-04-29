import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable, Button } from 'react-native-paper';

import CustomModal from '../../components/CustomModal';
import DeleteModal from '../../components/DeleteModal';

interface FormData {
    name: string;
    label: string;
}

interface ProductInventoryFormProps<T> {
    title: string;
    buttonTitle: string
    details: T[];
    setDetails: React.Dispatch<React.SetStateAction<T[]>>;
    formFields: FormData[];
    columns: T[];
}

export const ProductInventoryForm = ({ title, buttonTitle, details, setDetails, formFields, columns }: ProductInventoryFormProps<any>) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [rowToDelete, setRowToDelete] = useState<any>(null);

    // Function to handle saving the form data
    const handleSave = (data: any) => {
        const updatedDetails = [...details, data];
        //setDetails(updatedDetails);
        setSelectedRow(null);
        setModalVisible(false);
    };

    // Function to handle canceling the modal
    const handleCancel = () => {
        setModalVisible(false);
        setRowToDelete(null);
    };

    // Function to handle confirming row deletion
    const handleDeleteConfirmation = () => {
        if (rowToDelete) {
            const updatedDetails = details.filter((item) => item !== rowToDelete);
            setDetails(updatedDetails);
            setShowDeleteModel(false);
            setRowToDelete(null);
        }
    };

    // Function to calculate total cost
    const calculateTotalCost = (): number => {
        return details.reduce((total, item) => total + parseFloat(item.totalCost), 0);
    };


    return (
        <View style={styles.section}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{title}</Text>
            <DataTable style={{ display: 'flex', justifyContent: 'space-between' }}>
                <DataTable.Header>
                    {columns.map((key, i) => (
                        <DataTable.Title key={i}>{key}</DataTable.Title>
                    ))}
                    <DataTable.Title>Actions</DataTable.Title>

                </DataTable.Header>
                {details.map((item, index) => (
                    <DataTable.Row key={index}>
                        {Object?.keys(item)?.map((key, i) => (
                            <DataTable.Cell key={i} >{item[key]}</DataTable.Cell>
                        ))}
                        <DataTable.Cell>
                            <Button
                                onPress={() => {
                                    setRowToDelete(item);
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
                                    setSelectedRow(item);
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
                {details.length > 0 &&
                    <DataTable.Row>
                        <DataTable.Cell numeric>TotalCost:</DataTable.Cell>
                        <DataTable.Cell numeric>{calculateTotalCost()}</DataTable.Cell>
                    </DataTable.Row>
                }
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.addButton}
                >
                    <Text style={styles.addButtonText}>{buttonTitle}</Text>
                </TouchableOpacity>
            </DataTable>

            {/* Modal for confirmation */}
            <CustomModal
                fields={formFields}
                visible={modalVisible}
                onSave={handleSave}
                onCancel={handleCancel}
                initialData={selectedRow}
                details={details}
                setDetails={setDetails}
            />
            {showDeleteModel && <DeleteModal
                visible={showDeleteModel}
                onCancel={() => setShowDeleteModel(!showDeleteModel)}
                onDelete={handleDeleteConfirmation}
            />}

        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 5
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        marginRight: 10,
    },
});

