class Api::RepliesController < ApplicationController
  before_action :set_comment, except: [:userinfo]
  before_action :set_reply, only: [:show, :update, :destroy]

  def index
    render json: @comment.replies
  end

  def show
    render json: @reply
  end

  def userinfo
    render json: Reply.user_info(params[:user_id], params[:id])
  end

  def create
    @user = current_user
    reply = @user.replies.new(reply_params)
    if reply.save
      render json: reply
    else
      render json: reply.errors, status: 422
    end
  end

  def update
    if @reply.update(reply_params)
      render json: @reply
    else
      render json: reply.errors, status: 422
    end
  end

  def destroy
    @reply.destroy
  end

  private
    def set_comment
      @comment = Comment.find(params[:comment_id])
    end

    def set_reply
      @reply = Reply.find(params[:id])
    end

    def reply_params
      params.require(:reply).permit(:body, :comment_id)
    end
end
