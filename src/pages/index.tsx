import { useState } from 'react';
import styles from './index.module.css';

//useStateを減らす
//機能を全部入れる(リプレイ不要)
//初級～上級
//カスタムサイズ
//スマホ対応
//要件通りに作る
//計算値＝状態と計算値を加工して作る値
//状態：時間で変化し保存される値=>board
//状態はアプリを壊す
//計算値：=>blackPoint boardから生成できる
const Home = () => {
  const [samplePos, setSamplePos] = useState(0);

  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [userInputs, setUserInputs] = useState([]); //0~3 クリック 右クリック
  //合成
  const board: number[][] = [];
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      board.push(); // 0-8数字 9爆弾 10赤い爆弾 11
    }
  }
  //tsx board.map
  console.log(samplePos);

  //   //再帰関数 0連鎖
  //   const fn = (hikisuu) => {
  //     if() {
  // //0が続く限り開く
  //     }else {
  //       fn();
  //     }
  //     return;
  //   };
  //Reactの副作用
  //useStateや計算値をもとに=>tsx->DOM(ブラウザ)
  //UI = f(state)  Home(useState)

  //useEffect 副作用を隔離する クリーンナップ 時計
  //1s毎に再描画
  return (
    <div className={styles.container}>
      <div
        className={styles.sampleStyle}
        style={{ backgroundPosition: `${samplePos * -30}px 0px` }} //cssスプライト
      />
      <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button>
    </div>
  );
};

export default Home;
