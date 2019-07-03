class Api::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]

  def index
    render json: Course.all
  end

  def show
    if current_user
      role = Enrollment.find_by(course_id: @course.id, user_id: current_user.id).role
    e = Enrollment.find_by(course_id: @course.id, user_id: current_user.id)
    else
      e = nil
    end
    render json: {course: @course, registered: e ? true : false, role: role }
  end
  # 

  def create
    course = Course.new(course_params)
    if course.save
      Enrollment.create(role: "teacher", course_id: course.id, user_id: current_user.id)
      render json: course
    else
      render json: course.errors, status: 422
    end
  end

  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: course.errors, status: 422
    end
  end

  def destroy
    @course.destroy
  end

  private
  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:title, :category, :overview, :image)
  end
  def find_role
    @role = Enrollment.find_by(course_id: @course.id, user_id: current_user.id).role
  end
end
