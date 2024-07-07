import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign'

function SearchBar({search, setSearch}: {search: string, setSearch: (search: string) => void} ) {
    return (
        <View style={styles.searchBarContainer}>
            <View style={styles.searchInputContainer}>
                <AntDesign name="search1" size={25} color='black' style={styles.searchIcon} />
                <TextInput
                    placeholder='Looking for a fish?'
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchBar}
                />
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',

    },
    searchBar: {
        fontSize: 16,
        fontFamily: 'Dangrek-Regular',
        width: '80%',
        borderColor: 'gray',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
    },
    searchBarContainer: {
        padding: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'gray',
        paddingHorizontal: 10,

    },
}

export default SearchBar;