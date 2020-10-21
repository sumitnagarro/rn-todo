import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import homeStyles from '../css/HomeCSS';
import { Header } from 'react-native-elements';
import { getTodo } from '../constants/Constant';
import { Icon } from 'react-native-elements';


import { SafeAreaView } from 'react-native';
import Error from './Error';

const Home = () => {
    //Defining react hook
    const [isLoading, setLoading] = useState(true); //Setting default value as true
    const [isError, setError] = useState(false); // Initial isError is false
    const [data, setData] = useState([]); //Default values to empty list

    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         setError(false);
    //         const result = await axios.get(getTodo);
    //         setData(result.data);
    //     }
    //     catch {
    //         setError(true);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //Calling api is useEffect
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);
            const result = await axios.get(getTodo);
            setData(result.data);
        }
        catch (e) {
            console.log(`hello ${e}`);
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    return (
        <>
            <SafeAreaView style={homeStyles.container}>
                <View style={homeStyles.container}>
                    <Header centerComponent={{ text: 'Todos', style: homeStyles.headerText }} backgroundColor="steelblue" />
                    {
                        isLoading ?
                            (<View style={homeStyles.activityIndicator}>
                                <ActivityIndicator color="red" size="large" />
                            </View>) :

                            isError ? <Error onPress={() => {
                                fetchData();
                            }} /> :
                                (<FlatList
                                    data={data}
                                    keyExtractor={({ id }, _) => id}
                                    renderItem={({ item }) => (
                                        <View style={homeStyles.listItems} >
                                            <View style={homeStyles.listItem}>
                                                <Text style={homeStyles.normalText}>
                                                    Todo: {item.title}
                                                </Text>
                                                {
                                                    item.completed ? <Icon
                                                        name="done" color="green" style={homeStyles.displayIcon} /> : <Icon
                                                            style={homeStyles.displayIcon}
                                                            name="clear" color="red" />
                                                }
                                            </View>
                                        </View>

                                    )}
                                />)}
                </View>
            </SafeAreaView>
        </>
    );
};

export default Home;
