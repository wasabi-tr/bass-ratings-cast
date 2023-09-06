## LURE CASE

ブラックバス専門のルアー評価サイトです。  
https://bass-ratings-cast.vercel.app/

簡単ログインユーザー :  
mail: user@example.com  
pw: testuser

## 制作意図

ブラックバスを釣るためのルアーは選びきれないほど種類があります。また、実際に購入して使ってみないとルアーの性能や動き、釣果などはわかりません。最近では各ルアーメーカーが Youtube などのプラットフォームを用いてルアーの解説動画や性能、動きを説明し、たくさんの魚を釣ってルアーの紹介をしています。

しかし、そのプロモーションは毎日釣りに行けて、凄腕のプロが、数週間〜数ヶ月使用して作成しています。
そのルアーを 3 日使って釣れなくても、4 日目で釣れれば、動画の編集によってあたかも簡単に釣れるルアーであるかのように見えてしまいます。私自身もプロモーションを見て購入したことが何度もあります。もちろん動画通りに素晴らしい商品もあるりますが、中にはそうではないものもありました。

釣りをする多くの人達は、限られた資金、時間の中で釣りをしています。1 ヶ月に 1 回の釣行で予算は数千円しか使えないという人も身の回りにいます。ルアーの値段も安くてピンキリではありますが、約 700 円~4000 円と安価ではない価格帯です。

そのような人たちが、ユーザーが投稿する公平なレビューサイトを見ることで限られた予算、時間でも魚を釣ってほしいという思いから作成を始めました

## 主な機能

### ルアー検索機能

- ルアー名のフリーワード検索が行なえます。
- リアルタイムで検索結果を取得しています。

### レビュー機能

- レビューの新規登録・更新が行なえます。
- 5 つの項目を 5 段階評価します。

### 新規登録、ログイン機能

- メールアドレス、パスワードを使った新規登録、ログインができます。
- Google アカウントでのログインができます。

### プロフィール機能

- プロフィールを編集できます。
- ユーザー画像をアップロードできます。

### 商品情報登録機能

https://bass-ratings-cast.vercel.app/lure-register

- ルアーの商品情報を新規追加・更新することができます。
- 商品画像をアップロードできます。

### メーカー情報登録機能

https://bass-ratings-cast.vercel.app/bland-register

- メーカーの商品情報を新規追加・更新することができます。
- メーカーの画像をアップロードできます。

## ER 図

<img width="661" alt="er" src="https://github.com/takaryu39/bass-ratings-cast/assets/81959203/65233317-4a16-46be-8447-267e686db69f">

## 使用技術

## インフラ

- Vercel

## フロントエンド

- node:16.14.2
- react:18.2.0
- Next.js:13.4.5 (pages directory)
- typescript:5.1.3
- zustand
- react-query
- recharts
- react-awesome-stars-rating
- react-error-boundary
- Tailwindcss

## バックエンド

- Supabase:2.0.18
