import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';

interface DeleteModalProps {
    visible: boolean;
    onCancel: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel, onDelete }) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onCancel}
            transparent
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
                    <View style={styles.buttonContainer}>
                        <Button mode='elevated' textColor='white' style={{backgroundColor:'black'}}  onPress={onCancel} >Cancel</Button>
                        <Button mode='elevated' textColor='white' style={{backgroundColor:'red'}}  onPress={onDelete} >Delete</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 30,
        gap: 10,
    },
    modalView: {
        backgroundColor: 'white',
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:'red'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default DeleteModal;
