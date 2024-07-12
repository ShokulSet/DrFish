import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const App = () => {
    const [modalVisible, setModalVisible] = useState(true);
  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.thTitle}>
                ข้อตกลงการใช้ซอฟต์แวร์ 
              </Text>
              <Text style={styles.th}>
                ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดยนางสาวชลนา เครือวุฒิกุล, นายเสฎฐพันธ์ เหล่าอารีย์ และ นายภาคภูมิ คงสุทธิ จากโรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร (ฝ่ายมัธยม) ภายใต้การดูแลของนางสาวณัฏฐาทิพ จันทร์ผล ภายใต้โครงการ Dr. Fish: แอปพลิเคชันจำแนกสปีชีส์สัตว์น้ำพร้อมให้ข้อมูลด้วยเสียงบรรยาย และระบบสารานุกรม สำหรับติดตามความคืบหน้าในการเยี่ยมชม ซึ่งสนับสนุนโดย ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟต์แวร์ ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา ซึ่งผู้พัฒนาได้อนุญาตให้ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ เผยแพร่ซอฟต์แวร์นี้ตาม “ต้นฉบับ” โดยไม่มีการแก้ไขดัดแปลงใดๆ ทั้งสิ้น ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์ในเชิงพาณิชย์ โดยไม่คิดค่าตอบแทนการใช้ซอฟต์แวร์ ดังนั้น ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ จึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน หรือพัฒนาประสิทธิภาพซอฟต์แวร์ รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์ ตลอดจนไม่รับประกันความเสียหายต่างๆ อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น
              </Text>

              <Text style={styles.enTitle}>
                License Agreement
              </Text>
              <Text style={styles.en}>
                This software is a work developed by Miss Chonlana Kruawuthikun, Mr. Settapun Laoaree, and Mr. Pakpoom Khonghsootthi from Prasarnmit Demonstration School (Secondary) under the provision of Ms. Nattatip Junphol under Dr. Fish: Species classify application with vocal description and Encyclopedia system, which has been supported by the National Electronics and Computer Technology Center (NECTEC), in order to encourage pupils and students to learn and practice their skills in developing software.  Therefore, the intellectual property of this software shall belong to the developer and the developer gives NECTEC a permission to distribute this software as an “as is” and non-modified software for a temporary and non-exclusive use without remuneration to anyone for his or her own purpose or academic purpose, which are not commercial purposes.  In this connection, NECTEC shall not be responsible to the user for taking care, maintaining, training or developing the efficiency of this software. Moreover, NECTEC shall not be liable for any error, software efficiency and damages in connection with or arising out of the use of the software.
              </Text>

            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.enTitle, {color: 'white'}]}>I understand</Text>
            </Pressable>
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
  },
  thTitle: {
    fontFamily: 'Mitr-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  th: {
    fontFamily: 'Mitr-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  enTitle: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  en: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;