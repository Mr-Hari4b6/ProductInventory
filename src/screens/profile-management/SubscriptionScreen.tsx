import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

interface SubscriptionDetails {
    packageName: string;
    validityDate: string;
    packageCost: string;
    benefits: string[];
}

const staticSubscriptionDetails: {
    subscriptionDetails: SubscriptionDetails;
} = {
    subscriptionDetails: {
        packageName: 'Premium Package',
        validityDate: '2024-04-30',
        packageCost: '$99.99/month',
        benefits: [
            'Enhanced Product Selling Capabilities',
            'Comprehensive Inventory Management Tools',
            'Improved Customer Satisfaction',
        ],
    },
};

export const SubscriptionScreen = () => {

    const { subscriptionDetails } = staticSubscriptionDetails;
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };
    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.subscriptionContainer}>
                    <Text style={styles.title}>Subscription Details</Text>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Package Name:</Text>
                        <Text style={styles.value}>{subscriptionDetails.packageName}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Validity Date:</Text>
                        <Text style={styles.value}>{subscriptionDetails.validityDate}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Package Cost:</Text>
                        <Text style={styles.value}>{subscriptionDetails.packageCost}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.benefitsContainer}>
                <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
                    <Text style={styles.title}>Subscription Benefits</Text>
                    <Icon name={expanded ? 'caret-up' : 'caret-down'} size={24} color="black" />
                </TouchableOpacity>
                {expanded &&
                    <View style={styles.benefitsContent}>
                        {subscriptionDetails.benefits.map((benefit, index) => (
                            <Text key={index} style={styles.benefit}>{index+1}{'.'}{' '}{benefit}</Text>
                        ))}
                    </View>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    cardContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        padding: 20,
    },
    subscriptionContainer: {},
    benefitsContainer: {
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
    benefitsContent: {
        marginTop: 5,
    },
    benefit: {
        marginBottom: 5,
        padding:5,

    }
});
