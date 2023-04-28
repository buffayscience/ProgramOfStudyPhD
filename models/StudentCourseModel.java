package models;

public class StudentCourseModel {

    private int area; // 1 for major // 2 for minor and 3 for math/quant
    private boolean isMastersCourse;
    private boolean isMathCourse;
    private String department;
    private String courseName;
    private String courseNumber;
    private int courseLevel;
    private boolean isUWMCourse;
    private int credits;

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public boolean isMastersCourse() {
        return isMastersCourse;
    }

    public void setMastersCourse(boolean isMastersCourse) {
        this.isMastersCourse = isMastersCourse;
    }

    public boolean isMathCourse() {
        return isMathCourse;
    }

    public void setMathCourse(boolean isMathCourse) {
        this.isMathCourse = isMathCourse;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public int getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(int courseLevel) {
        this.courseLevel = courseLevel;
    }

    public boolean isUWMCourse() {
        return isUWMCourse;
    }

    public void setUWMCourse(boolean isUWMCourse) {
        this.isUWMCourse = isUWMCourse;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

}
