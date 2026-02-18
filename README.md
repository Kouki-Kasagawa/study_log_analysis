
**このウェブアプリの説明を行う**
# Study Log Web App

学習行動を記録し、将来的に機械学習で
「どんな条件で学習が進むか」を分析するためのWebアプリです。
今回は、AIと対話を行いながら、細かい仕様を決めずにコーディングを行うバイブコーディングを行っています。
この手法をとった理由は、ウェブアプリ制作の流れを知り、どのような知識が用いられているのかを知りたいと思ったからです。

## 開発記録
本プロジェクトの開発プロセスや、学習した技術（Flask, Docker, SQLite等）の詳細は、以下のNotionページで公開しています。<br>
[学習記録、試行錯誤はこちらから](https://www.notion.so/2c45d5e4275c8066a22cf18d7b4a2553?source=copy_link)

## 概要
- Flask を用いた学習ログ入力Webアプリ
- SQLite に学習データを保存
- 将来的に ML（教師あり学習）で進捗予測を行う想定でしたがあきらめました

## 機能
- 学習ログの入力
  - 学習開始時刻
  - 学習時間
  - 気分（1〜5）
  - その時の天気（Open-Meteo APIを使用）
- SQLite への保存
- 学習ログ一覧表示

## 技術スタック
- Python
- Flask
- SQLite
- HTML

## ディレクトリ構成
study_log_analysis/<br>
├ run.py<br>
└ app/<br>
    ├ init.py<br>
    ├ routes.py<br>
    ├ analyze.py<br>
    ├ study.db<br>
    ├ weather.py<br>
    ├ update_weather.py<br>
    ├ css/<br>
    ├ js/<br>
      └script.js<br>
    └ templates/<br>
      ├ index.html<br>
      ├ logs.html<br>
      └ tamplate.html<br>

perl
コードをコピーする

## 起動方法
```bash
python run.py
ブラウザで以下にアクセス
http://localhost:8000
