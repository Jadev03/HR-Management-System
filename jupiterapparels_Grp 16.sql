CREATE DATABASE  IF NOT EXISTS `jupiterapparels` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jupiterapparels`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: jupiterapparels
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `Branch_ID` varchar(5) NOT NULL,
  `Name` varchar(20) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Country` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Branch_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('BD001','Dhaka Office','303 Gulshan Road, Dhaka','Bangladesh'),('BD002','Chittagong Office','404 Port Area, Chittagong','Bangladesh'),('BD003','Rajshahi Office','789 University Road, Rajshahi','Bangladesh'),('PK001','Lahore Office','101 Gulberg Road, Lahore','Pakistan'),('PK002','Karachi Office','202 Clifton Street, Karachi','Pakistan'),('PK003','Islamabad Office','505 Diplomatic Enclave, Islamabad','Pakistan'),('SL001','Colombo Office','456 Park Avenue, Colombo','Sri Lanka'),('SL002','Kandy Office','789 Hill Street, Kandy','Sri Lanka'),('SL003','Galle Office','123 Main Road, Galle','Sri Lanka');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_field`
--

DROP TABLE IF EXISTS `custom_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_field` (
  `Field_ID` varchar(5) NOT NULL,
  `Field_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Field_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_field`
--

LOCK TABLES `custom_field` WRITE;
/*!40000 ALTER TABLE `custom_field` DISABLE KEYS */;
INSERT INTO `custom_field` VALUES ('00001','Nationality'),('00002','Languages Spoken'),('00003','Educational Level'),('00005','Country');
/*!40000 ALTER TABLE `custom_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `custom_field_aspect`
--

DROP TABLE IF EXISTS `custom_field_aspect`;
/*!50001 DROP VIEW IF EXISTS `custom_field_aspect`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `custom_field_aspect` AS SELECT 
 1 AS `field_name`,
 1 AS `employee_ID`,
 1 AS `field_val`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Dept_ID` varchar(7) NOT NULL,
  `Dept_Name` varchar(30) DEFAULT NULL,
  `Building` varchar(30) DEFAULT NULL,
  `Branch_ID` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`Dept_ID`),
  KEY `Branch_ID` (`Branch_ID`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Branch_ID`) REFERENCES `branch` (`Branch_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('BD001D1','HR Department','Building Z','BD001'),('BD001D2','Finance Department','Building B','BD001'),('BD002D1','IT Department','Building C','BD002'),('BD002D2','Marketing Department','Building D','BD002'),('BD003D1','Sales Department','Building E','BD003'),('BD003D2','R&D Department','Building F','BD003'),('PK001D1','Production Department','Building G','PK001'),('PK001D2','Logistics Department','Building H','PK001'),('PK002D1','Quality Control Department','Building I','PK002'),('PK002D2','Customer Support Department','Building J','PK002'),('PK003D1','Legal Department','Building K','PK003'),('PK003D2','Security Department','Building L','PK003'),('SL001D1','Administration Department','Building M','SL001'),('SL001D2','Engineering Department','Building N','SL001'),('SL002D1','Design Department','Building O','SL002'),('SL002D2','Maintenance Department','Building P','SL002'),('SL003D1','Research Department','Building Z','SL003'),('SL003D2','Training Department','Building X','SL003');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependent_info`
--

DROP TABLE IF EXISTS `dependent_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent_info` (
  `Name` varchar(20) NOT NULL,
  `Employee_ID` varchar(7) NOT NULL,
  `Date_of_birth` date DEFAULT NULL,
  `Relationship` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Name`,`Employee_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `dependent_info_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent_info`
--

LOCK TABLES `dependent_info` WRITE;
/*!40000 ALTER TABLE `dependent_info` DISABLE KEYS */;
INSERT INTO `dependent_info` VALUES ('Abigail','E000009','1975-09-14','Spouse'),('Aiden','E000006','2003-06-30','Child'),('Aiden','E000021','2015-04-23','Child'),('Ava','E000017','2007-03-20','Child'),('Ava','E000022','2013-03-12','Child'),('Ava','E000036','2012-03-28','Child'),('Avery','E000030','2018-04-16','Child'),('Avery','E000044','2014-09-12','Child'),('Benjamin','E000011','2005-10-12','Child'),('Charlotte','E000015','2011-08-09','Child'),('Chloe','E000026','2014-10-21','Child'),('Chloe','E000038','2020-08-09','Child'),('David','E000001','1995-03-15','Spouse'),('Elijah','E000008','1998-04-02','Spouse'),('Ella','E000004','2002-09-05','Child'),('Emily','E000010','2006-11-20','Child'),('Emma','E000020','2014-07-01','Child'),('Emma','E000032','2016-11-25','Child'),('Ethan','E000031','2017-02-19','Child'),('Eva','E000013','2008-02-05','Child'),('Henry','E000005','1990-02-14','Spouse'),('Henry','E000016','2009-05-03','Child'),('Henry','E000041','2017-02-14','Child'),('Isabella','E000005','1999-11-18','Child'),('Jack','E000018','2012-09-28','Child'),('Jackson','E000019','2006-10-10','Child'),('Jackson','E000043','2015-11-20','Child'),('James','E000009','2004-03-08','Child'),('Liam','E000004','1978-12-22','Spouse'),('Liam','E000023','2011-01-09','Child'),('Liam','E000033','2015-09-07','Child'),('Lily','E000014','2013-06-14','Child'),('Lily','E000024','2017-09-15','Child'),('Lily','E000042','2016-01-03','Child'),('Logan','E000029','2019-05-11','Child'),('Logan','E000039','2019-06-18','Child'),('Lucas','E000012','2010-12-30','Child'),('Mason','E000027','2012-06-27','Child'),('Mason','E000035','2013-05-11','Child'),('Mia','E000008','2007-08-17','Child'),('Noah','E000025','2016-12-04','Child'),('Noah','E000037','2011-01-14','Child'),('Oliver','E000003','1992-07-10','Child'),('Olivia','E000007','2001-05-25','Child'),('Olivia','E000034','2014-07-15','Child'),('Sarah','E000001','2000-01-01','Child'),('Scarlett','E000012','1982-07-28','Spouse'),('Sofia','E000028','2005-08-03','Child'),('Sophia','E000002','1998-04-20','Child'),('Sophia','E000040','2018-04-27','Child'),('ZZZ','E000040','2001-04-26','Child');
/*!40000 ALTER TABLE `dependent_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `dependent_check` BEFORE INSERT ON `dependent_info` FOR EACH ROW begin
	declare employee_availability int;
    
    select count(*) into employee_availability
    from employee
    where employee.Employee_ID=new.Employee_ID;
    
    if employee_availability = 0 then
		signal sqlstate '45000'
        set message_text = 'Employee does not exist';
	end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `emergency_contact`
--

DROP TABLE IF EXISTS `emergency_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergency_contact` (
  `Emerg_Contact_ID` varchar(7) NOT NULL,
  `Employee_ID` varchar(7) DEFAULT NULL,
  `First_Name` varchar(20) DEFAULT NULL,
  `Last_Name` varchar(20) DEFAULT NULL,
  `Tel_No` varchar(10) DEFAULT NULL,
  `Relationship` varchar(30) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Emerg_Contact_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `emergency_contact_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergency_contact`
--

LOCK TABLES `emergency_contact` WRITE;
/*!40000 ALTER TABLE `emergency_contact` DISABLE KEYS */;
INSERT INTO `emergency_contact` VALUES ('EC00001','E000001','Kasun','Perera','0712616466','Brother','Anuradhapura','irash@gmial.com'),('EC00002','E000002','Bob','Doe','9876543210','Parent','456 Elm St, Town','bob.doe@email.com'),('EC00003','E000003','Charlie','Johnson','2345678901','Sibling','789 Oak St, Village','charlie.johnson@email.com'),('EC00004','E000004','David','Williams','3456789012','Spouse','567 Pine St, Suburb','david.williams@email.com'),('EC00005','E000005','Ella','Brown','4567890123','Parent','789 Cedar St, County','ella.brown@email.com'),('EC00006','E000006','Fiona','Smith','5678901234','Sibling','123 Maple St, Town','fiona.smith@email.com'),('EC00007','E000007','George','Johnson','6789012345','Spouse','456 Oak St, Village','george.johnson@email.com'),('EC00008','E000008','Hannah','Davis','7890123456','Parent','789 Pine St, Suburb','hannah.davis@email.com'),('EC00009','E000009','Isaac','Wilson','8901234567','Sibling','567 Cedar St, County','isaac.wilson@email.com'),('EC00010','E000010','Jack','Miller','9012345678','Spouse','123 Elm St, City','jack.miller@email.com'),('EC00011','E000011','Katherine','Moore','1239876543','Parent','456 Maple St, Town','katherine.moore@email.com'),('EC00012','E000012','Liam','Smith','2348765432','Sibling','789 Oak St, Village','liam.smith@email.com'),('EC00013','E000013','Mia','Davis','3457654321','Spouse','456 Pine St, Suburb','mia.davis@email.com'),('EC00014','E000014','Noah','Wilson','4566543210','Parent','567 Cedar St, County','noah.wilson@email.com'),('EC00015','E000015','Olivia','Miller','5675432109','Sibling','789 Elm St, City','olivia.miller@email.com'),('EC00016','E000016','Peter','Moore','6784321098','Spouse','123 Cedar St, County','peter.moore@email.com'),('EC00017','E000017','Quinn','Smith','7893210987','Parent','456 Oak St, Village','quinn.smith@email.com'),('EC00018','E000018','Rachel','Davis','8902109876','Sibling','789 Pine St, Suburb','rachel.davis@email.com'),('EC00019','E000019','Samuel','Wilson','9010987654','Spouse','567 Maple St, Town','samuel.wilson@email.com'),('EC00020','E000020','Tessa','Miller','9876543210','Parent','123 Elm St, City','tessa.miller@email.com'),('EC00021','E000021','Ulysses','Moore','8765432109','Sibling','456 Pine St, Suburb','ulysses.moore@email.com'),('EC00022','E000022','Victoria','Smith','7654321098','Spouse','789 Cedar St, County','victoria.smith@email.com'),('EC00023','E000023','William','Davis','6543210987','Parent','456 Oak St, Village','william.davis@email.com'),('EC00024','E000024','Xavier','Wilson','5432109876','Sibling','789 Elm St, City','xavier.wilson@email.com'),('EC00025','E000025','Yasmine','Miller','4321098765','Spouse','567 Maple St, Town','yasmine.miller@email.com'),('EC00026','E000026','Zachary','Moore','3210987654','Parent','123 Elm St, City','zachary.moore@email.com'),('EC00027','E000027','Ava','Smith','2109876543','Sibling','456 Pine St, Suburb','ava.smith@email.com'),('EC00028','E000028','Benjamin','Davis','1098765432','Spouse','789 Oak St, Village','benjamin.davis@email.com'),('EC00029','E000029','Charlotte','Wilson','9876543210','Parent','789 Cedar St, County','charlotte.wilson@email.com'),('EC00030','E000030','Daniel','Miller','8765432109','Sibling','456 Maple St, Town','daniel.miller@email.com'),('EC00031','E000031','Emily','Moore','7654321098','Spouse','123 Elm St, City','emily.moore@email.com'),('EC00032','E000032','Finn','Smith','6543210987','Parent','789 Pine St, Suburb','finn.smith@email.com'),('EC00033','E000033','Grace','Davis','5432109876','Sibling','789 Cedar St, County','grace.davis@email.com'),('EC00034','E000034','Henry','Wilson','4321098765','Spouse','456 Maple St, Town','henry.wilson@email.com'),('EC00035','E000035','Isabella','Miller','3210987654','Parent','123 Elm St, City','isabella.miller@email.com'),('EC00036','E000036','Jacob','Moore','2109876543','Sibling','456 Pine St, Suburb','jacob.moore@email.com'),('EC00037','E000037','Katherine','Smith','1098765432','Spouse','789 Oak St, Village','katherine.smith@email.com'),('EC00038','E000038','Liam','Davis','9876543210','Parent','789 Cedar St, County','liam.davis@email.com'),('EC00039','E000039','Mia','Wilson','8765432109','Sibling','456 Maple St, Town','mia.wilson@email.com'),('EC00040','E000040','Noah','Miller','7654321098','Spouse','123 Elm St, City','noah.miller@email.com'),('EC00041','E000041','Olivia','Moore','6543210987','Parent','789 Pine St, Suburb','olivia.moore@email.com'),('EC00042','E000042','Peter','Smith','5432109876','Sibling','789 Cedar St, County','peter.smith@email.com'),('EC00043','E000043','Quinn','Davis','4321098765','Spouse','456 Maple St, Town','quinn.davis@email.com'),('EC00044','E000044','Rachel','Wilson','3210987654','Parent','123 Elm St, City','rachel.wilson@email.com'),('EC00045','E000045','Samuel','Miller','2109876543','Sibling','456 Pine St, Suburb','samuel.miller@email.com'),('EC00046','E000046','Tessa','Moore','1098765432','Spouse','789 Oak St, Village','tessa.moore@email.com'),('EC00047','E000047','Ulysses','Smith','9876543210','Parent','789 Cedar St, County','ulysses.smith@email.com'),('EC00048','E000048','Victoria','Davis','8765432109','Sibling','456 Maple St, Town','victoria.davis@email.com'),('EC00049','E000049','William','Wilson','7654321098','Spouse','123 Elm St, City','william.wilson@email.com'),('EC00050','E000050','Xavier','Miller','6543210987','Parent','789 Pine St, Suburb','xavier.miller@email.com');
/*!40000 ALTER TABLE `emergency_contact` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `emergcont_check` BEFORE INSERT ON `emergency_contact` FOR EACH ROW begin
	declare employee_availability int;
    
SELECT 
    COUNT(*)
INTO employee_availability FROM
    employee
WHERE
    employee.Employee_ID = new.Employee_ID;
    
    if employee_availability = 0 then
		signal sqlstate '45000'
        set message_text = 'Employee does not exist';
	end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `emp_status`
--

DROP TABLE IF EXISTS `emp_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_status` (
  `Status_ID` varchar(10) NOT NULL,
  `Category` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Status_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_status`
--

LOCK TABLES `emp_status` WRITE;
/*!40000 ALTER TABLE `emp_status` DISABLE KEYS */;
INSERT INTO `emp_status` VALUES ('CON_FT','Contract (Full-time)'),('CON_PT','Contract (Part-time)'),('FREELANCE','Freelance'),('INT_FT','Intern (Full-time)'),('INT_PT','Intern (Part-time)'),('PERM','Permanent');
/*!40000 ALTER TABLE `emp_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Employee_ID` varchar(7) NOT NULL,
  `First_Name` varchar(50) DEFAULT NULL,
  `Last_Name` varchar(50) DEFAULT NULL,
  `NIC` varchar(12) DEFAULT NULL,
  `Date_Of_Birth` date DEFAULT NULL,
  `Gender` enum('Male','Female') DEFAULT NULL,
  `Tel_No` varchar(10) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Dept_ID` varchar(7) DEFAULT NULL,
  `Maritial_Status` enum('Single','Married','Divorced','Widowed','Separated') DEFAULT NULL,
  `Title_ID` varchar(5) DEFAULT NULL,
  `Paygrade_ID` varchar(5) DEFAULT NULL,
  `Status_ID` varchar(10) DEFAULT NULL,
  `Supervisor_ID` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`),
  KEY `Title_ID` (`Title_ID`),
  KEY `Paygrade_ID` (`Paygrade_ID`),
  KEY `employee_ibfk_3` (`Dept_ID`),
  KEY `employee_ibfk_5` (`Status_ID`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Title_ID`) REFERENCES `job_title` (`Title_ID`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`),
  CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`Paygrade_ID`) REFERENCES `pay_grade` (`Paygrade_ID`),
  CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`Status_ID`) REFERENCES `emp_status` (`Status_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('E000001','Irash','Perera','880524789V','1988-05-24','Male','0712616466','irashperera123@email.com','BD001D1','Married','JT001','L4','CON_FT','E000037'),('E000002','Akshiya','Raveendiran','900630456M','1990-06-30','Female','9876543210','akshiyaravee123@email.com','BD001D2','Single','JT002','L2','PERM',''),('E000003','Yasiru','Laksara','870712345P','1987-07-12','Male','2345678901','yasirulaksara123@email.com','BD002D1','Married','JT003','L3','CON_FT','E000036'),('E000004','Pramnitha','Dasun','920315678Q','1992-03-15','Male','3456789012','praminthadasun123@email.com','PK002D1','Single','JT004','L2','CON_FT','E000042'),('E000005','Thabendra','Ganeshan','850528910R','1985-05-28','Male','4567890123','thabendraganeshan123@email.com','BD001D2','Divorced','JT002','L2','PERM','E000018'),('E000006','Olivia','Smith','901122345T','1990-11-22','Female','5678901234','olivia.smith@email.com','BD002D1','Single','JT003','L3','INT_FT','E000001'),('E000007','William','Johnson','880703456U','1988-07-03','Male','6789012345','william.johnson@email.com','BD002D1','Married','JT003','L3','INT_FT','E000001'),('E000008','Sophia','Davis','930214567V','1993-02-14','Female','7890123456','sophia.davis@email.com','BD002D1','Single','JT003','L3','INT_FT','E000006'),('E000009','James','Wilson','860525678W','1986-05-25','Male','8901234567','james.wilson@email.com','BD002D2','Married','JT003','L3','INT_FT','E000006'),('E000010','Isabella','Miller','910628789X','1991-06-28','Female','9012345678','isabella.miller@email.com','BD002D2','Single','JT003','L3','INT_FT','E000007'),('E000011','Benjamin','Moore','870709890Y','1987-07-09','Male','1239876543','benjamin.moore@email.com','BD002D2','Married','JT003','L3','INT_FT','E000007'),('E000012','Mia','Smith','910123456Z','1991-01-23','Female','2348765432','mia.smith@email.com','BD003D1','Single','JT003','L3','CON_FT','E000003'),('E000013','Elijah','Davis','890512345A','1989-05-12','Male','3457654321','elijah.davis@email.com','BD003D1','Married','JT003','L3','CON_FT','E000003'),('E000014','Abigail','Wilson','940626789B','1994-06-26','Female','4566543210','abigail.wilson@email.com','BD003D1','Single','JT003','L3','CON_FT','E000012'),('E000015','Lucas','Miller','900709890C','1990-07-09','Male','5675432109','lucas.miller@email.com','BD003D2','Married','JT003','L3','CON_FT','E000012'),('E000016','Charlotte','Moore','930823456D','1993-08-23','Female','6784321098','charlotte.moore@email.com','BD003D2','Single','JT003','L3','CON_FT','E000013'),('E000017','Henry','Smith','880304567E','1988-03-04','Male','7893210987','henry.smith@email.com','BD003D2','Married','JT003','L3','CON_FT','E000013'),('E000018','Scarlett','Davis','920507890F','1992-05-07','Female','8902109876','scarlett.davis@email.com','PK001D1','Single','JT002','L3','CON_FT','E000003'),('E000019','Jackson','Wilson','890630123G','1989-06-30','Male','9010987654','jackson.wilson@email.com','PK001D1','Married','JT003','L3','CON_FT','E000003'),('E000020','Emma','Miller','950703456H','1995-07-03','Female','9876543210','emma.miller@email.com','PK001D1','Single','JT003','L3','CON_FT','E000018'),('E000021','Aiden','Moore','880123567J','1988-01-23','Male','8765432109','aiden.moore@email.com','PK001D2','Married','JT003','L3','CON_FT','E000018'),('E000022','Ava','Smith','940412345K','1994-04-12','Female','7654321098','ava.smith@email.com','PK001D2','Single','JT003','L3','CON_FT','E000019'),('E000023','Liam','Davis','900625678L','1990-06-25','Male','6543210987','liam.davis@email.com','PK001D2','Married','JT003','L3','CON_FT','E000019'),('E000024','Lily','Wilson','950729890M','1995-07-29','Female','5432109876','lily.wilson@email.com','PK002D1','Single','JT003','L3','INT_FT','E000003'),('E000025','Noah','Miller','890801234N','1989-08-01','Male','4321098765','noah.miller@email.com','PK002D1','Married','JT003','L3','INT_FT','E000003'),('E000026','Chloe','Moore','910903456P','1991-09-03','Female','3210987654','chloe.moore@email.com','PK002D1','Single','JT003','L3','INT_FT','E000024'),('E000027','Mason','Smith','960123567Q','1996-01-23','Male','2109876543','mason.smith@email.com','PK002D2','Married','JT003','L3','INT_FT','E000024'),('E000028','Sofia','Davis','900312345R','1990-03-12','Female','1098765432','sofia.davis@email.com','PK002D2','Single','JT003','L3','INT_FT','E000025'),('E000029','Logan','Wilson','910415678S','1991-04-15','Male','9876543210','logan.wilson@email.com','PK002D2','Married','JT003','L3','INT_FT','E000025'),('E000030','Avery','Miller','950512345T','1995-05-12','Female','8765432109','avery.miller@email.com','SL001D1','Single','JT003','L3','CON_FT','E000003'),('E000031','Ethan','Moore','890625678U','1989-06-25','Male','7654321098','ethan.moore@email.com','SL001D1','Married','JT003','L3','CON_FT','E000003'),('E000032','Emma','Smith','920729890V','1992-07-29','Female','6543210987','emma.smith@email.com','SL001D1','Single','JT003','L3','CON_FT','E000030'),('E000033','Liam','Davis','960801234W','1996-08-01','Male','5432109876','liam.davis@email.com','SL001D2','Married','JT003','L3','CON_FT','E000030'),('E000034','Olivia','Wilson','900923456X','1990-09-23','Female','4321098765','olivia.wilson@email.com','SL001D2','Single','JT003','L3','CON_FT','E000031'),('E000035','Mason','Miller','970123567Y','1997-01-23','Male','3210987654','mason.miller@email.com','SL001D2','Married','JT003','L3','CON_FT','E000031'),('E000036','Ava','Moore','930312345Z','1993-03-12','Female','2109876543','ava.moore@email.com','SL002D1','Single','JT003','L3','CON_FT','E000003'),('E000037','Noah','Smith','900415678AA','1990-04-15','Male','1098765432','noah.smith@email.com','SL002D1','Married','JT001','L3','CON_FT','E000003'),('E000038','Chloe','Davis','920528910BB','1992-05-28','Female','9876543210','chloe.davis@email.com','SL002D1','Single','JT003','L3','CON_FT','E000036'),('E000039','Logan','Wilson','970630123CC','1997-06-30','Male','8765432109','logan.wilson@email.com','SL002D2','Married','JT003','L3','CON_FT','E000036'),('E000040','Sophia','Miller','940723456DD','1994-07-23','Female','7654321098','sophia.miller@email.com','SL002D2','Single','JT003','L3','CON_FT','E000037'),('E000041','Henry','Moore','900804567EE','1990-08-04','Male','6543210987','henry.moore@email.com','SL002D2','Married','JT003','L3','CON_FT','E000037'),('E000042','Lily','Smith','920907890FF','1992-09-07','Female','5432109876','lily.smith@email.com','SL003D1','Single','JT004','L3','INT_FT',''),('E000043','Jackson','Davis','950123456GG','1995-01-23','Male','4321098765','jackson.davis@email.com','SL003D1','Married','JT003','L3','INT_FT','E000003'),('E000044','Avery','Wilson','890226789HH','1989-02-26','Female','3210987654','avery.wilson@email.com','SL003D1','Single','JT003','L3','INT_FT','E000042'),('E000045','Ethan','Miller','930329890II','1993-03-29','Male','2109876543','ethan.miller@email.com','SL003D2','Married','JT003','L3','INT_FT','E000042'),('E000046','Sofia','Moore','960401234JJ','1996-04-01','Female','1098765432','sofia.moore@email.com','SL003D2','Single','JT003','L3','INT_FT','E000043'),('E000047','Logan','Smith','910513567KK','1991-05-13','Male','9876543210','logan.smith@email.com','SL003D2','Married','JT003','L3','INT_FT','E000043'),('E000048','Ava','Davis','940626789LL','1994-06-26','Female','8765432109','ava.davis@email.com','SL001D1','Single','JT003','L3','CON_FT','E000036'),('E000049','Liam','Wilson','970709890MM','1997-07-09','Male','7654321098','liam.wilson@email.com','SL001D1','Married','JT003','L3','CON_FT','E000036'),('E000050','Emma','Miller','900812345NN','1990-08-12','Female','6543210987','emma.miller@email.com','SL001D1','Single','JT003','L3','CON_FT','E000030'),('E000060','Kasun','Perera','123456789V','2001-04-26','Male','0712616466','irash@gmial.com','SL002D1','Married','JT003','L3','CON_FT','E000037'),('E000070','Kasun','Perera','123456789V','2001-04-26','Male','0712616466','irash@gmial.com','SL002D1','Married','JT003','L3','CON_FT','E000037'),('E000080','Amal','Kumara','123456789V','1991-05-17','Male','0712616466','amal@gmail.com','SL003D1','Married','JT003','L2','CON_FT','E000037'),('E000081','Kamal','Saman','123456789V','1981-05-14','Male','0712616466','kamal@gmail.com','SL003D1','Married','JT003','L2','CON_FT','E000037');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `jobtitle_check` BEFORE INSERT ON `employee` FOR EACH ROW begin
	declare job_availability int;
    
SELECT 
    COUNT(*)
INTO job_availability FROM
    job_title
WHERE
    job_title.Title_ID = new.Title_ID;
    
    if job_availability = 0 then
		signal sqlstate '45000'
        set message_text = 'Job does not exist';
	end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_leave_balance` AFTER INSERT ON `employee` FOR EACH ROW begin
    declare annual_leave int;
    declare casual_leave int;
    declare maternity_leave int;
    declare no_pay int;

SELECT 
    Annual_Leave_Allowance,
    Casual_Leave_Allowance,
    Maternity_Leave_Allowance,
    NO_Pay_Allowance
INTO annual_leave , casual_leave , maternity_leave , no_pay FROM
    pay_grade
WHERE
    Paygrade_ID = new.Paygrade_ID;

    insert into leave_balance (Employee_ID, Year, Annual, Casual, Maternity, No_pay)
    values (new.Employee_ID, YEAR(CURRENT_DATE()), annual_leave, casual_leave, maternity_leave, no_pay);
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `employee_custom_field`
--

DROP TABLE IF EXISTS `employee_custom_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_custom_field` (
  `Field_ID` varchar(5) NOT NULL,
  `Employee_ID` varchar(7) NOT NULL,
  `Field_val` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Field_ID`,`Employee_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `employee_custom_field_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_custom_field`
--

LOCK TABLES `employee_custom_field` WRITE;
/*!40000 ALTER TABLE `employee_custom_field` DISABLE KEYS */;
INSERT INTO `employee_custom_field` VALUES ('00001','E000080','Sinhalese'),('00001','E000081','Tamil'),('00002','E000080','English'),('00002','E000081','Tamil'),('00003','E000080','Higher Education'),('00003','E000081','Higher Education');
/*!40000 ALTER TABLE `employee_custom_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_title`
--

DROP TABLE IF EXISTS `job_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_title` (
  `Title_ID` varchar(5) NOT NULL,
  `Title` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`Title_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_title`
--

LOCK TABLES `job_title` WRITE;
/*!40000 ALTER TABLE `job_title` DISABLE KEYS */;
INSERT INTO `job_title` VALUES ('JT001','HR Manager'),('JT002','Accountant'),('JT003','Software Engineer'),('JT004','QA Engineer'),('JT005','Sales Manager'),('JT006','Marketing Specialist'),('JT007','Production Manager'),('JT008','Logistics Coordinator'),('JT009','Quality Control Analyst'),('JT010','Customer Support Representative'),('JT011','Legal Counsel'),('JT012','Security Officer'),('JT013','Administration Manager'),('JT014','Engineering Lead'),('JT015','Design Specialist'),('JT016','Maintenance Technician'),('JT017','Research Scientist'),('JT018','Training Coordinator'),('JT019','Data Analyst'),('JT020','Financial Analyst');
/*!40000 ALTER TABLE `job_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_balance`
--

DROP TABLE IF EXISTS `leave_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_balance` (
  `Employee_ID` varchar(7) NOT NULL,
  `Year` year NOT NULL,
  `Annual` int DEFAULT NULL,
  `Casual` int DEFAULT NULL,
  `Maternity` int DEFAULT NULL,
  `No_pay` int DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`,`Year`),
  CONSTRAINT `leave_balance_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_balance`
--

LOCK TABLES `leave_balance` WRITE;
/*!40000 ALTER TABLE `leave_balance` DISABLE KEYS */;
INSERT INTO `leave_balance` VALUES ('E000001',2023,11,12,13,14),('E000002',2023,25,12,14,50),('E000003',2023,30,15,16,50),('E000004',2023,35,18,18,50),('E000005',2023,20,10,12,50),('E000006',2023,25,12,14,50),('E000007',2023,30,15,16,50),('E000008',2023,35,18,18,50),('E000009',2023,20,10,12,50),('E000010',2023,25,12,14,50),('E000011',2023,30,15,16,50),('E000012',2023,35,18,18,50),('E000013',2023,20,10,12,50),('E000014',2023,25,12,14,50),('E000015',2023,30,15,16,50),('E000016',2023,35,18,18,50),('E000017',2023,20,10,12,50),('E000018',2023,25,12,14,50),('E000019',2023,30,15,16,50),('E000020',2023,35,18,18,50),('E000021',2023,20,10,12,50),('E000022',2023,25,12,14,50),('E000023',2023,30,15,16,50),('E000024',2023,35,18,18,50),('E000025',2023,20,10,12,50),('E000026',2023,25,12,14,50),('E000027',2023,30,15,16,50),('E000028',2023,35,18,18,50),('E000029',2023,20,10,12,50),('E000030',2023,25,12,14,50),('E000031',2023,30,15,16,50),('E000032',2023,35,18,18,50),('E000033',2023,20,10,12,50),('E000034',2023,25,12,14,50),('E000035',2023,30,15,16,50),('E000036',2023,35,18,18,50),('E000037',2023,20,10,12,50),('E000038',2023,25,12,14,50),('E000039',2023,30,15,16,50),('E000040',2023,35,18,18,50),('E000041',2023,20,10,12,50),('E000042',2023,25,12,14,50),('E000043',2023,30,15,16,50),('E000044',2023,35,18,18,50),('E000045',2023,20,10,12,50),('E000046',2023,25,12,14,50),('E000047',2023,30,15,16,50),('E000048',2023,35,18,18,50),('E000049',2023,20,10,12,50),('E000050',2023,25,12,14,50),('E000060',2023,30,15,16,50),('E000070',2023,30,15,16,50),('E000080',2023,25,12,14,50),('E000081',2023,25,12,14,50);
/*!40000 ALTER TABLE `leave_balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_request`
--

DROP TABLE IF EXISTS `leave_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_request` (
  `Leave_Request_ID` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` varchar(7) DEFAULT NULL,
  `Leave_Type` enum('Annual','Casual','Maternity','No-pay') DEFAULT NULL,
  `Supervisor_ID` varchar(7) DEFAULT NULL,
  `Reason` varchar(50) DEFAULT NULL,
  `Start_Date` date DEFAULT NULL,
  `End_Date` date DEFAULT NULL,
  `Duration` varchar(20) DEFAULT NULL,
  `Status` enum('Pending','Approved','Rejected','Cancelled') DEFAULT 'Pending',
  `Comments` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Leave_Request_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `leave_request_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
INSERT INTO `leave_request` VALUES (1,'E000004','Annual','E000002','Vacation','2023-09-01','2023-09-05','5 days','Approved','Enjoy your vacation'),(2,'E000005','Casual','E000002','Family event','2023-10-10','2023-10-11','2 days','Pending',''),(3,'E000007','Annual','E000001','Holiday','2023-12-20','2023-12-31','12 days','Pending',''),(4,'E000009','Maternity','E000001','Maternity Leave','2023-11-15','2024-02-15','3 months','Pending',''),(5,'E000011','Casual','E000001','Personal reasons','2023-09-15','2023-09-15','1 day','Approved','Approved for a day off'),(6,'E000014','Annual','E000003','Annual Leave','2023-11-05','2023-11-12','8 days','Pending',''),(7,'E000016','Casual','E000003','Family gathering','2023-10-22','2023-10-23','2 days','Pending',''),(8,'E000018','Annual','E000012','Vacation','2023-09-10','2023-09-20','11 days','Pending',''),(9,'E000020','No-pay','E000019','Personal reasons','2023-09-25','2023-09-25','1 day','Pending',''),(10,'E000022','Annual','E000019','Annual Leave','2023-11-01','2023-11-10','10 days','Pending',''),(11,'E000024','Casual','E000019','Family event','2023-10-07','2023-10-08','2 days','Pending',''),(12,'E000026','Annual','E000025','Vacation','2023-12-01','2023-12-15','15 days','Pending',''),(13,'E000028','Annual','E000025','Annual Leave','2023-11-10','2023-11-20','11 days','Pending',''),(14,'E000030','Maternity','E000025','Maternity Leave','2023-10-15','2024-01-15','3 months','Pending',''),(15,'E000032','Annual','E000030','Vacation','2023-12-05','2023-12-15','11 days','Pending',''),(17,'E000040','Casual','E000037','fdvdvvdv','2023-10-20','2023-10-31','2','Approved','Enjoy:)');
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_info`
--

DROP TABLE IF EXISTS `organization_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization_info` (
  `Head_office` varchar(5) DEFAULT NULL,
  `Org_name` varchar(30) DEFAULT NULL,
  `Reg_no` int DEFAULT NULL,
  `Organization_ID` varchar(5) NOT NULL,
  PRIMARY KEY (`Organization_ID`),
  KEY `Head_office` (`Head_office`),
  CONSTRAINT `organization_info_ibfk_1` FOREIGN KEY (`Head_office`) REFERENCES `branch` (`Branch_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_info`
--

LOCK TABLES `organization_info` WRITE;
/*!40000 ALTER TABLE `organization_info` DISABLE KEYS */;
INSERT INTO `organization_info` VALUES ('BD001','Jupiter Bangladesh',12345,'00001'),('PK001','Jupiter Pakistan',67890,'00002'),('SL001','Jupiter Sri Lanka',54321,'00003');
/*!40000 ALTER TABLE `organization_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_grade`
--

DROP TABLE IF EXISTS `pay_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_grade` (
  `Paygrade_ID` varchar(5) NOT NULL,
  `Pay_Grade_Level` varchar(7) DEFAULT NULL,
  `Annual_Leave_Allowance` int DEFAULT NULL,
  `Casual_Leave_Allowance` int DEFAULT NULL,
  `Maternity_Leave_Allowance` int DEFAULT NULL,
  `NO_Pay_Allowance` int DEFAULT NULL,
  `Description` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`Paygrade_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_grade`
--

LOCK TABLES `pay_grade` WRITE;
/*!40000 ALTER TABLE `pay_grade` DISABLE KEYS */;
INSERT INTO `pay_grade` VALUES ('L1','Level 1',20,8,10,50,'Level 1'),('L2','Level 2',25,12,14,50,'Mid-level employees'),('L3','Level 3',30,15,16,50,'Senior employees'),('L4','Level 4',35,18,18,50,'Management level');
/*!40000 ALTER TABLE `pay_grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `personal_aspect`
--

DROP TABLE IF EXISTS `personal_aspect`;
/*!50001 DROP VIEW IF EXISTS `personal_aspect`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `personal_aspect` AS SELECT 
 1 AS `Employee_ID`,
 1 AS `First_Name`,
 1 AS `Last_Name`,
 1 AS `NIC`,
 1 AS `Date_Of_Birth`,
 1 AS `Tel_No`,
 1 AS `Email`,
 1 AS `Department`,
 1 AS `Maritial_Status`,
 1 AS `Title`,
 1 AS `Supervisor_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `supervisor_aspect`
--

DROP TABLE IF EXISTS `supervisor_aspect`;
/*!50001 DROP VIEW IF EXISTS `supervisor_aspect`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `supervisor_aspect` AS SELECT 
 1 AS `Employee_ID`,
 1 AS `First_Name`,
 1 AS `Last_Name`,
 1 AS `NIC`,
 1 AS `Tel_No`,
 1 AS `Email`,
 1 AS `Department`,
 1 AS `Title`,
 1 AS `Supervisor_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_ID` varchar(7) NOT NULL,
  `Employee_ID` varchar(7) DEFAULT NULL,
  `Access_level` enum('Admin','HR','Level 1','Supervisor','Sec. Management User','Manager') DEFAULT NULL,
  `Password` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  KEY `Access_level` (`Access_level`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('U000001','E000001','Admin','$2b$10$ehZBviXc65cssqGxY0AWeuM3mIhBftMyZX5a45xBLFWgzjhE7qGKi'),('U000002','E000002','HR','$2b$10$4ge/Hdp6ocX.Ngecfj.jN.wvaK0YpOaw00KP3oGndwf5BlbJOK.We'),('U000003','E000003','Level 1','$2b$10$TPOxX6UD4F9GzZAd2SntB.G0.YUYa3t4nUxdPY4o0tni.f9cbma9.'),('U000004','E000004','Supervisor','$2b$10$sDNwbfnLy0w1K4WsmyfIJudRa1OOSW4E3KckXqlYrhwKHdznqRYoa'),('U000005','E000005','Sec. Management User','$2b$10$H3LcNYFl6NiXd2rqaSXhd.hxy8zpqu3AcgkH16HRqAaVocKJeLQ4.'),('U000006','E000006','Manager','$2b$10$/rNp/On70ugm0m3bqdOISencHd56w5DmOhnboFMZ7rHZn9clu2de.'),('U000051','E000001','Admin','$2b$10$Qr4zZHdceO/3TtB90ec/xuwHuWSJot/r/Yfu2h4NPZKS4tbh3kBVu'),('U000052','E000002','HR','$2b$10$vb1VDM47bPIoEvOr7mw6uewBItX6DtAbcM4NMqh3AeIN2o0ZOEz76'),('U000053','E000040','Sec. Management User','$2b$10$b8rlN6jM2im3gKaIoQDTKemqwNS2ymvompc0unDOZjPMlK7075gii'),('U000054','E000041','Sec. Management User','$2b$10$jBDG1Py2DgK4gyb.ShZQQOzM/QHUgnVfeR/HtOsIYRDOzdW2vSXMS'),('U000060','E000004','Supervisor','$2b$10$FwSR1ssdx72mKMD2biOjF.MtGCx4MbXzKxep9tHSA/1oWruOmq5/G'),('U000080','E000037','Supervisor','$2b$10$KSHeWeB1jeRNb8cDh9WqMei/acXQGF.cQELUftSxAVbZC6XfDf5ZK'),('U000100','E000045','HR','$2b$10$F.Xsdx77hYHPr59.RLG.bulIGc/qQC1M7nEf.FmIxPV5n7RY5jqAm'),('U000101','E000035','Level 1','$2b$10$6OaE4mXH3Or.D9drOwtGGeMFseN8rrTRWZW8PONK8UNzdVVeKAXLC'),('U000102','E000050','Manager','$2b$10$htK/diBlXO3/ZBpFoAmSPuxRWZYnruxkoGaA82lzpfWd9kxqoeOL2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `user_check` BEFORE INSERT ON `user` FOR EACH ROW begin
	declare employee_availability int;
    
    select count(*) into employee_availability
    from employee
    where employee.Employee_ID=new.Employee_ID;
    
    if employee_availability = 0 then
		signal sqlstate '45000'
        set message_text = 'Employee does not exist';
	end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'jupiterapparels'
--

--
-- Dumping routines for database 'jupiterapparels'
--

--
-- Final view structure for view `custom_field_aspect`
--

/*!50001 DROP VIEW IF EXISTS `custom_field_aspect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `custom_field_aspect` AS select `a`.`Field_name` AS `field_name`,`b`.`Employee_ID` AS `employee_ID`,`b`.`Field_val` AS `field_val` from (`custom_field` `a` join `employee_custom_field` `b`) where (`a`.`Field_ID` = `b`.`Field_ID`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `personal_aspect`
--

/*!50001 DROP VIEW IF EXISTS `personal_aspect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `personal_aspect` AS select `employee`.`Employee_ID` AS `Employee_ID`,`employee`.`First_Name` AS `First_Name`,`employee`.`Last_Name` AS `Last_Name`,`employee`.`NIC` AS `NIC`,`employee`.`Date_Of_Birth` AS `Date_Of_Birth`,`employee`.`Tel_No` AS `Tel_No`,`employee`.`Email` AS `Email`,`department`.`Dept_Name` AS `Department`,`employee`.`Maritial_Status` AS `Maritial_Status`,`job_title`.`Title` AS `Title`,`employee`.`Supervisor_ID` AS `Supervisor_ID` from ((`employee` join `job_title` on((`employee`.`Title_ID` = `job_title`.`Title_ID`))) join `department` on((`employee`.`Dept_ID` = `department`.`Dept_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `supervisor_aspect`
--

/*!50001 DROP VIEW IF EXISTS `supervisor_aspect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `supervisor_aspect` AS select `employee`.`Employee_ID` AS `Employee_ID`,`employee`.`First_Name` AS `First_Name`,`employee`.`Last_Name` AS `Last_Name`,`employee`.`NIC` AS `NIC`,`employee`.`Tel_No` AS `Tel_No`,`employee`.`Email` AS `Email`,`department`.`Dept_Name` AS `Department`,`job_title`.`Title` AS `Title`,`employee`.`Supervisor_ID` AS `Supervisor_ID` from ((`employee` join `job_title` on((`employee`.`Title_ID` = `job_title`.`Title_ID`))) join `department` on((`employee`.`Dept_ID` = `department`.`Dept_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-17 12:43:44
