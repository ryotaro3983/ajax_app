class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    #Ajax通信のための準備：変数に格納
    post = Post.create(content: params[:content])
    #redirectでページ更新ではなく、renderメソッドでレスポンス
    render json:{post: post}
  end
end