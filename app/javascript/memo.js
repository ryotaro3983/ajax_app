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
  });
};

window.addEventListener('load', post);