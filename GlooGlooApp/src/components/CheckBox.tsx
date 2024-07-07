import { Pressable, Text, View } from "react-native";

function CheckBox({check, setCheck, whenCheck, whenNotCheck}:
    {check: boolean, setCheck: (check: boolean) => void, whenCheck: string, whenNotCheck: string})
    {

  return (
    <View
        style={styles.container}
    >
        <Pressable
            onPress={() => setCheck(!check)}
            style={[styles.checkBox, {backgroundColor: check ? 'gray' : 'white'}]}
        >
            <Text
                style={styles.text}
            >
                {check ? whenCheck : whenNotCheck}
            </Text>
        </Pressable>

    </View>
  );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
    },
    checkBox: {
        width: 80,
        height: 40,
        borderRadius: 20,
    },
    text: {
        fontSize: 16,
        fontFamily: 'Dangrek-Regular',
        color: 'black',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
}

export default CheckBox;