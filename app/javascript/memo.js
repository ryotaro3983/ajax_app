//onload内で定義していた変数html = の部分を buildHTML として切り出し
const buildHTML = (XHR) => {
  //postsコントローラーのcreateアクションにrender json: {post: post}と記述されているため取り出せる
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
    //投稿後に新たに生成されたHTMLを返り値としている
  return html;
};


function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {  //e はイベントオブジェクトといい、イベント発生時の情報を持っている。
    e.preventDefault();                      //今回は、「クリックした時」というイベント情報を持ったオブジェクトになる。
    const form = document.getElementById("form");
    const formData = new FormData(form);            //これで、非同期通信で情報を渡す準備ができた
                                                    //submit要素ボタンをクリックすると、form要素の値をformDataに格納した
    const XHR = new XMLHttpRequest();      //JavaからAjaxでデータ通信する時に使うオブジェクトを生成、代入
    XHR.open("POST", "/posts", true);     //リクエストの内容を指定
    XHR.responseType = "json";      //JSON形式でレスポンスを返すよう指定
    XHR.send(formData);       //フォームに入力されたデータを送信(send)
    //onloadプロパティでリクエスト送信が成功したときの処理を記述
    XHR.onload = () => {
      //XHR.statusにはHTTPステータスコードが格納されている
      if (XHR.status != 200) {
        //XHR.statusTextのはコードに応じたメッセージが格納される
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        //return null; でjavaの処理から抜け出す
        //エラーが出た場合この下の処理を実行させないため
        return null;
      };
      //HTMLを生成する記述
      const list = document.getElementById("list");
      //フォームの入力データを取得(投稿後フォームにデータが残っているのを削除する準備)
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);