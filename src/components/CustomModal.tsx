import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

interface Field {
    name: string;
    label: string;
}

interface CustomModalProps<T> {
    visible: boolean;
    fields: Field[];
    onSave: (data: any) => void; // Adjusted onSave function signature
    onCancel: () => void;
    details: T[];
    setDetails: React.Dispatch<React.SetStateAction<T[]>>;
    initialData?: { [key: string]: string } | any
}

const CustomModal: React.FC<CustomModalProps<any>> = ({ visible, fields, onSave, onCancel, initialData, details, setDetails }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (initialData) {
            // Set initial form values using selected row data
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (name: string, value: string) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        if (initialData) {
            // If initialData exists, find the index of the object to update
            const index = details.findIndex((item: { [key: string]: string; }) => item === initialData);
            if (index !== -1) {
                // Create a copy of the details array and update the specific object
                const updatedDetails = [...details];
                updatedDetails[index] = { ...initialData, ...formData };
                setDetails(updatedDetails);
                onSave(formData)
                setFormData({});
            }
        } else {
            // If initialData doesn't exist, save new data
            setDetails((prevDetails: any) => [...prevDetails, formData]);
            onSave(formData);
        }
        // Reset form data and close modal

        setFormData({});
        onCancel();
    };

    const handleCancel = () => {
        // Reset form data and close modal
        setFormData({});
        onCancel();
    };

    return (
        <Modal visible={visible} onRequestClose={handleCancel} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {fields.map(field => (
                        <View key={field.name}>
                            <TextInput
                                placeholder={`Enter ${field.label}`}
                                value={formData[field.name] || ''}
                                onChangeText={text => handleChange(field.name, text)}
                                style={styles.input}
                                label={field.label}
                                mode='outlined'
                            />
                        </View>
                    ))}
                    <View style={styles.buttonContainer}>
                        <Button icon="file" mode="elevated" onPress={handleSave} >Save</Button>
                        <Button icon="cancel" mode="elevated" onPress={handleCancel}>Cancel</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        gap: 10,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        elevation: 5,
    },
    input: {
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});

export default CustomModal;
