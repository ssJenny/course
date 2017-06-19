# ionic
> ionic是一个强大的HTML5 SDK，可快速构建原生风格的移动应用，支持IOS和android
## 安装ionic
### 开发环境组件
>> 1. Node.js
>> 2. Cordova, ionic CLI
>> 3. Java JDK
>> 4. Android SDK
### 安装Node.js
>> 前往[NodeJS官网](https://nodejs.org/en/)下载安装包，直接安装
>> 完成安装打开终端，输入node -v，正常显示版本号则成功安装
### 安装Java JDK
>> [官网](http://www.oracle.com/technetwork/java/javase/downloads/index.html)下载

>>> 
	JAVA_HOME
	d:\jdk
Path
	;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
CLASSPATH
	.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar

### 安装Android SDK
>> [下载](https://developer.android.com/studio/index.html)安装包

>>>
 SDK环境变量配置：
Path
	
	;D:\sdk\platform-tools;D:\sdk\tools

### 安装npm镜像
>> npm install -g cnpm --registry=https://registry.npm.taobao.org 

### 安装ionic
>> cnpm install -g ionic cordova
>> 切换到工程目录，创建ionic工程
>>> ionic start myApp tabs

>> 进入项目，添加android平台
>>> ionic platform add android

>> 查看项目
>>> ionic serve 