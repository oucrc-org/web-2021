# web-2021

OUCRCの公式サイトのソースコードです。

環境が変わった場合は.envファイルの中身を変更してください。
また、metaデータの初期値はassets/mixins/const.jsにて変更可能です。

## 環境構築

Nuxt2なので、nuxt.comではなく[nuxtjs.org](https://nuxtjs.org/docs/get-started/installation)を参照してください。

```sh
npm i
npm run dev
```

## コミット

```sh
npx git-cz
```

## 本番における動作確認

```sh
npm run build
npm run start

# 静的書き出し
npm run generate
```
