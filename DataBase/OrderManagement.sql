USE [master]
GO
/****** Object:  Database [SalesManagement]    Script Date: 08-Sep-2022 4.34.12 PM ******/
CREATE DATABASE [SalesManagement]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Sales', FILENAME = N'C:\Users\PCUSER\Sales.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Sales_log', FILENAME = N'C:\Users\PCUSER\Sales_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SalesManagement] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SalesManagement].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SalesManagement] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SalesManagement] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SalesManagement] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SalesManagement] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SalesManagement] SET ARITHABORT OFF 
GO
ALTER DATABASE [SalesManagement] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SalesManagement] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SalesManagement] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SalesManagement] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SalesManagement] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SalesManagement] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SalesManagement] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SalesManagement] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SalesManagement] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SalesManagement] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SalesManagement] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SalesManagement] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SalesManagement] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SalesManagement] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SalesManagement] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SalesManagement] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SalesManagement] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SalesManagement] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SalesManagement] SET  MULTI_USER 
GO
ALTER DATABASE [SalesManagement] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SalesManagement] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SalesManagement] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SalesManagement] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SalesManagement] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SalesManagement] SET QUERY_STORE = OFF
GO
USE [SalesManagement]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [SalesManagement]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 08-Sep-2022 4.34.13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderNumber] [varchar](50) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[OrderStatus] [smallint] NOT NULL,
	[ShippingAddressId] [int] NOT NULL,
	[OrderDate] [datetime] NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductOrder]    Script Date: 08-Sep-2022 4.34.13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductOrder](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_ProductOrder] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShippingAddress]    Script Date: 08-Sep-2022 4.34.13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShippingAddress](
	[ShippingAddressId] [int] IDENTITY(1,1) NOT NULL,
	[City] [varchar](100) NOT NULL,
	[State] [varchar](100) NOT NULL,
	[Pincode] [numeric](8, 0) NOT NULL,
	[UserId] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_ShippingAddress] PRIMARY KEY CLUSTERED 
(
	[ShippingAddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([Id], [OrderNumber], [UserId], [OrderStatus], [ShippingAddressId], [OrderDate]) VALUES (2, N'123', N'1', 1, 1, CAST(N'2022-09-08T15:03:46.657' AS DateTime))
INSERT [dbo].[Order] ([Id], [OrderNumber], [UserId], [OrderStatus], [ShippingAddressId], [OrderDate]) VALUES (3, N'123', N'1', 1, 1, CAST(N'2022-09-08T15:08:55.147' AS DateTime))
INSERT [dbo].[Order] ([Id], [OrderNumber], [UserId], [OrderStatus], [ShippingAddressId], [OrderDate]) VALUES (4, N'123', N'1', 1, 1, CAST(N'2022-09-08T16:16:18.787' AS DateTime))
INSERT [dbo].[Order] ([Id], [OrderNumber], [UserId], [OrderStatus], [ShippingAddressId], [OrderDate]) VALUES (5, N'123', N'1', 1, 1, CAST(N'2022-09-08T16:18:49.877' AS DateTime))
SET IDENTITY_INSERT [dbo].[Order] OFF
SET IDENTITY_INSERT [dbo].[ProductOrder] ON 

INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (1, 2, 1, 3)
INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (2, 2, 2, 3)
INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (3, 3, 1, 1)
INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (4, 3, 2, 1)
INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (5, 4, 1, 1)
INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (6, 4, 2, 1)
INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (7, 5, 1, 1)
INSERT [dbo].[ProductOrder] ([Id], [OrderId], [ProductId], [Quantity]) VALUES (8, 5, 2, 2)
SET IDENTITY_INSERT [dbo].[ProductOrder] OFF
SET IDENTITY_INSERT [dbo].[ShippingAddress] ON 

INSERT [dbo].[ShippingAddress] ([ShippingAddressId], [City], [State], [Pincode], [UserId]) VALUES (1, N'Jalgaon', N'MH', CAST(452001 AS Numeric(8, 0)), N'1')
SET IDENTITY_INSERT [dbo].[ShippingAddress] OFF
ALTER TABLE [dbo].[Order] ADD  CONSTRAINT [DF_Order_OrderStatus]  DEFAULT ((1)) FOR [OrderStatus]
GO
ALTER TABLE [dbo].[Order] ADD  CONSTRAINT [DF_Order_OrderDate]  DEFAULT (getdate()) FOR [OrderDate]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Order] FOREIGN KEY([ShippingAddressId])
REFERENCES [dbo].[ShippingAddress] ([ShippingAddressId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Order]
GO
ALTER TABLE [dbo].[ProductOrder]  WITH CHECK ADD  CONSTRAINT [FK_ProductOrder_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[ProductOrder] CHECK CONSTRAINT [FK_ProductOrder_Order]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1 = ''Placed'', 2 = ''Approved'', 3 = ''Cancelled'',4=''In transit '', 5=''Delivered''' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Order', @level2type=N'COLUMN',@level2name=N'OrderStatus'
GO
USE [master]
GO
ALTER DATABASE [SalesManagement] SET  READ_WRITE 
GO
