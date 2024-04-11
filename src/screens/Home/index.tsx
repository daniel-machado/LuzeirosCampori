import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Switch, ScrollView, FlatList, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Card from '../../components/Card';
import { FlatListMembers } from './styles';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ItemData = {
  key: number;
  isDirection: boolean;
  name: string;
};

const KEY_LIST_MEMBERS = '@keyListMembers'

const Home = () => {
  const [name, setName] = useState('');
  const [isDirection, setIsDirection] = useState(false);
  const [people, setPeople] = useState([]);

  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY_LIST_MEMBERS);
      if (jsonValue !== null) {
        const parsedData = JSON.parse(jsonValue)
        setPeople(parsedData);
      }
    } catch (error) {
      Alert.alert('Erro ao carregar os dados ', error);
    }
  }

  const handleAddStorageAlert = async () => {
    Alert.alert(
      'Salvar',
      `Deseja salvar todos os dados?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'OK', onPress: () => handleAddDataStorage()}
      ],
      {cancelable: false}
    )
  }

  const handleAddDataStorage = async () => {
    try {
      await AsyncStorage.setItem(KEY_LIST_MEMBERS, JSON.stringify(people));
      Alert.alert('Dados salvos com Sucesso ');
    } catch (error) {
      Alert.alert('Error ao adicionar os dados: ', error)
    }
  }

  const handleRemoveStorageAlert = async () => {
    Alert.alert(
      'Remover',
      `Deseja remover todos os dados?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'OK', onPress: () => handleClearListStorage()}
      ],
      {cancelable: false}
    )
  }

  const handleClearListStorage = async () => {
    try {
      await AsyncStorage.removeItem(KEY_LIST_MEMBERS);
      setPeople([]);
      Alert.alert('Membros removidos com sucesso')
    } catch (error) {
      Alert.alert('Erro ao remover Membros', error)
    }
  }

  const handleAddName = () => {
    const keyNumber = people.length + 1;
    const newPerson = { key: keyNumber, name, isDirection };
    setPeople([...people, newPerson]);
    setName('');
  };

  const handleRemoveMember = (item) => {
    const peopleRemove = people.filter(person => person.key !== item.key)
    setPeople(peopleRemove)
  }

  const handleRemoveItem = (item) => {
    Alert.alert(
      'Apagar',
      `Deseja mesmo apagar ${item.name} da lista?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'OK', onPress: () => handleRemoveMember(item)}
      ],
      {cancelable: false}
    )
  }

  const renderDbvList = () => (
    <FlatListMembers
      data={people.filter(person => !person.isDirection)}
      renderItem={({ item }) => (
        <Card  
          item={item}
          onPress={() => handleRemoveItem(item)}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const renderDirectionList = () => (
    <FlatListMembers
      data={people.filter(person => person.isDirection)}
      renderItem={({ item }) => (
        <Card  
          item={item}
          onPress={() => handleRemoveItem(item)}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const countDbvAndDirection = () => {
    const dbvCount = people.filter(person => !person.isDirection).length;
    const directionCount = people.filter(person => person.isDirection).length;
    return { dbvCount, directionCount };
  };

  const calculatePercentage = (total, count) => {
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };


  const { dbvCount, directionCount } = countDbvAndDirection();
  const totalNames = people.length;
  const dbvPercentage = calculatePercentage(totalNames, dbvCount);
  const directionPercentage = calculatePercentage(totalNames, directionCount);

  const pieData = [
    {
      name: 'Dbvs',
      population: dbvPercentage,
      color: COLORS.BRAND_MID,
      legendFontColor: COLORS.GRAY_200,
      legendFontSize: 15
    },
    {
      name: 'Direção',
      population: directionPercentage,
      color: COLORS.YELLOW_MID,
      legendFontColor: COLORS.GRAY_200,
      legendFontSize: 15
    }
  ];

  return (
    <KeyboardAvoidingView style={{ backgroundColor: COLORS.GRAY_700, flex: 1, alignContent: 'center', padding: 15 }}
      behavior={Platform.OS === 'ios' ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
    >
      <View style={{ flexDirection: 'row' }}>
        <PieChart
          data={pieData}
          width={300}
          style={{ marginTop: 10 }}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <View
          style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 30, right: 10, zIndex: 1}}
        >
          <TouchableOpacity 
            style={{
              width: 60, 
              height: 60, 
              borderRadius: 30, 
              backgroundColor: COLORS.BRAND_LIGHT, 
              justifyContent: 'center', 
              alignItems: 'center',
              elevation: 5,  
            }}
            onPress={handleAddStorageAlert}
          >
            <Text style={{ fontSize: FONT_SIZE.SM , color: COLORS.WHITE, fontFamily: FONT_FAMILY.BOLD }}>Salvar</Text>
          </TouchableOpacity>

          { people &&
            <TouchableOpacity 
            style={{
              marginTop: 7,
              width: 40, 
              height: 40, 
              borderRadius: 20, 
              backgroundColor: COLORS.RED_LIGHT2, 
              justifyContent: 'center', 
              alignItems: 'center',
              elevation: 5,  
            }}
            onPress={handleRemoveStorageAlert}
          >
            <Text style={{ fontSize: FONT_SIZE.XS , color: COLORS.WHITE, fontFamily: FONT_FAMILY.BOLD }}>Limpar</Text>
          </TouchableOpacity>
          }
          
        </View>
      </View>
         <ScrollView style={{ maxHeight: '50%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: COLORS.GRAY_200 }}>Desbravadores: </Text>
                <Text style={{ color: COLORS.GRAY_200, fontWeight: 'bold' }}>{dbvCount}</Text>
              </View>
              {renderDbvList()}
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: COLORS.GRAY_200 }}>Direção: </Text>
                <Text style={{ color: COLORS.GRAY_200, fontWeight: 'bold' }}>{directionCount}</Text>
              </View>
              {renderDirectionList()}
            </View>
          </View>
        </ScrollView>

        <View style={{  flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{  flexDirection: 'row'}}>
            <Text style={{ color: COLORS.GRAY_200 }}>Desbravador %: </Text>
            <Text style={{ color: COLORS.GRAY_200, fontWeight: 'bold' }}>{dbvPercentage}%</Text>
          </View>
          <View style={{  flexDirection: 'row'}}>
            <Text style={{ color: COLORS.GRAY_200 }}>Direção %: </Text>
            <Text style={{ color: COLORS.GRAY_200, fontWeight: 'bold' }}>{directionPercentage}%</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ color: COLORS.GRAY_200 }}>Desbravador</Text>
          <Switch
            ios_backgroundColor={COLORS.YELLOW_MID}
            thumbColor={COLORS.WHITE}
            trackColor={{ false: COLORS.BRAND_MID, true: COLORS.YELLOW_MID }}
            value={isDirection}
            onValueChange={(value) => setIsDirection(value)}
          />
          <Text style={{ color: COLORS.GRAY_200 }}>Direção</Text>
        </View>
        
        <TextInput
          style={{
            height: 50,
            backgroundColor: COLORS.GRAY_600,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: COLORS.GRAY_500,
            borderRadius: 10,
            paddingHorizontal: 10,
            color: COLORS.GRAY_200,
          }}
          placeholderTextColor={COLORS.GRAY_200}
          placeholder="Nome do Membro"
          selectionColor={COLORS.BRAND_LIGHT}
          keyboardAppearance='dark'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View
          style={{marginBottom: 7}}  
        >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.YELLOW_MID,
            paddingVertical: 10,
            height: 45,
            paddingHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={handleAddName}
        >
          <Text style={{
            color: COLORS.GRAY_600,
            textAlign: 'center',
            fontSize: FONT_SIZE.MD,
            fontFamily: FONT_FAMILY.BOLD
          }}
        >
          Adicionar Membro
        </Text>
        </TouchableOpacity>
        </View>  
    </KeyboardAvoidingView>
  );
};

export default Home;