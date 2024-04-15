import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, List } from 'react-native-paper';


export const CustomSearch = () => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<string[]>([]);
    const [showList, setShowList] = useState(false);

    const datas = ['Axe', 'Gear Box']
    const handleSearch = (text: string) => {
        setSearchQuery(text);

        // Filter the data based on the search query
        const filtered = datas.filter(item =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
        setShowList(true);
    };

    const handleItemPress = (item: string) => {
        setSearchQuery(item);
        setShowList(false);
    };

    return(
      <View>
        <TextInput
            placeholder="Type something"
            label='Product Name'
            right={<TextInput.Icon icon="magnify" />}
            mode='outlined'
            value={searchQuery}
            onChangeText={handleSearch}
          />
            {showList && (
                <List.Section>
                    {filteredData.map((item, index) => (
                        <List.Item
                            key={index}
                            title={item}
                            onPress={() => handleItemPress(item)}
                        />
                    ))}
                </List.Section>
            )}
      </View>
    );
};