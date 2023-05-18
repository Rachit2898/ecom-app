import { StyleSheet, Dimensions } from "react-native";

const BlackTextColor = "#494c4c";
const whiteBackgroundColor = "#fff";
const AndaBlueThemeColor = "#063e63";
const YellowColor = "#ed8b00";
const ThinBorderGreyColor = "#ececec";
const BlueTextColor = "#006ba6";
const ThikBorderGreyColor = "#fafafa";
const JustifyContent = "justifyContent";
const FontSize = "12";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

const styles = StyleSheet.create({
  BlackTextColor: { color: BlackTextColor },
  BlueTextColor: { color: BlueTextColor },
  thikBorder: { borderTopWidth: 4, borderColor: ThikBorderGreyColor },
  FontWeight700: { fontWeight: "700" },
  FontSize12: { fontSize: "12" },
  loadingContainer: {
    height: 200,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },

  safeAreaView: {
    flex: 1,
    backgroundColor: AndaBlueThemeColor,
  },
  mainBoxLoading: {
    opacity: 0.2,
    backgroundColor: whiteBackgroundColor,
    flex: 1,
  },
  mainBox: {
    backgroundColor: whiteBackgroundColor,
    flex: 1,
  },
  mainSubmitBoxLoading: {
    opacity: 0.2,
    backgroundColor: whiteBackgroundColor,
    flex: 1,
    marginBottom: 300,
  },
  mainSubmitBox: {
    backgroundColor: whiteBackgroundColor,
    flex: 1,
    marginBottom: 300,
  },
  productHorizontalProductBox: {
    height: "90%",
    flexDirection: "row",
    width: "100%",
  },

  notifyText: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  orderLimitText: { fontSize: 12, color: "#bd1c1c" },
  orderLimitBox: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  productDetailBox: { margin: 10, height: 250 },
  slide: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  flexDirectionRow: { flexDirection: "row" },
  justifyContentSpaceBetween: { justifyContent: JustifyContent },
  sameDeliveryBox: {
    backgroundColor: "#f51441",
    margin: 10,
    borderRadius: 6,
    padding: 20,
  },
  preLookingBox: {
    backgroundColor: "#7c8ae6",
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
    padding: 20,
  },
  deliveryBoxImage: {
    borderRadius: 3,
    marginVertical: 5,
    width: 110,
    height: 80,
    justifyContent: "center",
    alignSelf: "center",
  },
  preLookingBottleImage: {
    borderRadius: 3,
    marginVertical: 5,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignSelf: "center",
  },

  sameDeliveryText: {
    color: whiteBackgroundColor,
    fontWeight: "800",
    fontSize: 18,
  },
  deliverySubBox: {
    justifyContent: "center",
    alignSelf: "center",
    width: "60%",
  },
  deliverySubBoxText: {
    color: whiteBackgroundColor,
    fontSize: 16,
    flexWrap: "wrap",
  },
  accountAlert: {
    borderColor: YellowColor,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  accountAlertHeading: {
    color: YellowColor,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  accountAlertBox: {
    borderBottomColor: YellowColor,
    borderBottomWidth: 1,
    flexDirection: "column",
  },
  horizontalScrollImages: {
    height: verticalScale(50),
    width: horizontalScale(95),
    borderRadius: 3,
    marginVertical: 5,
    borderWidth: 0.5,

    borderColor: ThinBorderGreyColor,
    resizeMode: "stretch",
  },
  footerImagesTab: {
    height: "70%",
    width: "70%",
    borderRadius: 3,
    marginVertical: 5,
    borderWidth: 0.5,
    alignSelf: "center",
    borderColor: ThinBorderGreyColor,
    resizeMode: "stretch",
    flex: 1,
    aspectRatio: 1.5,
  },
  footerImagesPhone: {
    width: "100%",
    borderRadius: 3,
    alignSelf: "center",
    resizeMode: "stretch",
    borderWidth: 1,
    aspectRatio: 1.5,
    flex: 1,
    marginVertical: 4,
  },
  horizontalScrollImageNames: {
    flexWrap: "wrap",
    color: BlueTextColor,
    fontWeight: "800",
    fontSize: 10,
    width: 100,
  },
  horizontalBorder: {
    borderTopWidth: 4,
    borderColor: ThikBorderGreyColor,
    marginVertical: 10,
  },

  headingSrting: {
    marginVertical: 8,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  headingSortingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: BlackTextColor,
  },

  modalView: {
    backgroundColor: whiteBackgroundColor,
    paddingVertical: 15,
    height: "96%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "10%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  closeButton: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: BlueTextColor,
    paddingHorizontal: 20,
    width: "100%",
    top: 0,
  },

  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 6,
    borderWidth: 1,
    borderColor: BlueTextColor,
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: BlueTextColor,
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  dropDownPicker: {
    zIndex: 3000,
    zIndexInverse: 1000,
    paddingHorizontal: 30,
  },
  filterValueText: { color: BlackTextColor, fontSize: 14 },
  checkBoxButton: { flexDirection: "row", marginTop: 5, alignItems: "center" },
  resetBox: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    alignSelf: "center",
    bottom: 0,
  },
  clearAllComponents: {
    backgroundColor: YellowColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  resetText: { fontSize: 12, color: whiteBackgroundColor, fontWeight: "bold" },
  doneComponents: {
    backgroundColor: BlueTextColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    marginHorizontal: 10,
  },
  imageSliderBox: {
    paddingHorizontal: 10,
    backgroundColor: ThikBorderGreyColor,
    paddingVertical: 5,
    borderRadius: 3,
  },
  productBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  pageCountingText: {
    color: BlackTextColor,
    fontWeight: "600",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  filterButton: {
    borderWidth: 1,
    width: 60,
    height: 25,
    borderColor: YellowColor,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: { fontWeight: "bold", color: YellowColor, fontSize: 12 },
  componentDividerBorder: {
    borderTopWidth: 4,
    borderColor: ThikBorderGreyColor,
    marginVertical: 10,
  },
  topBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    zIndex: 0,
    marginTop: 60,
  },

  screenNameText: { fontSize: 20, fontWeight: "bold", color: BlackTextColor },
  tabBarBox: { position: "absolute", left: 0, right: 0, bottom: 0 },
  emptyCart: {
    textAlign: "center",
    alignItems: "center",
    marginVertical: 60,
    flex: 1,
  },
  emptyCartText: {
    fontWeight: "bold",
    fontSize: 15,
    color: BlackTextColor,
  },

  pagination: {
    marginBottom: 60,
    marginTop: 10,
  },
  mainComponent: {
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: ThinBorderGreyColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  mainComponentLoading: {
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: ThinBorderGreyColor,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%",
    justifyContent: "space-between",
    opacity: 0.2,
  },
  bannerComponent: {
    backgroundColor: YellowColor,
    zIndex: 1,
    height: 20,
    width: 63,
    top: 30,
    left: -20,
    bottom: -50,
    borderRadius: 4,
  },
  bannerText: {
    color: whiteBackgroundColor,
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  modalBox: {
    backgroundColor: whiteBackgroundColor,
    margin: 10,
    width: "80%",
    alignSelf: "center",
    marginTop: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  modalBoxContainer: {
    justifyContent: "flex-end",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: ThinBorderGreyColor,
    flexDirection: "row",
  },
  productImage: {
    borderRadius: 3,
    marginVertical: 5,
    height: verticalScale(80),
    width: horizontalScale(80),
    backgroundColor: "grey",
  },
  catagoryImage: {
    width: 20,
    height: 20,
  },

  editButtonContainer: {
    backgroundColor: "#fff",
    height: 25,
    borderRadius: 3,
    borderRadius: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#878787",
    marginLeft: 10,
  },
  removeAddButton: {
    borderRightWidth: 1,
    borderColor: "#878787",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    backgroundColor: "#cfcccc",
  },
  signButton: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  countInput: {
    color: "#005185",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 30,
  },
  volumeDiscountBox: {
    borderColor: YellowColor,
    borderWidth: 1,
    height: 25,
    borderRadius: 4,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  centerBox: { justifyContent: "center", alignItems: "center" },

  //Account
  inputView: {
    backgroundColor: whiteBackgroundColor,
    borderWidth: 0.3,
    borderColor: "#9d9b9b",
    width: "100%",
    height: 45,
    flexDirection: "row",
    borderRadius: 3,
    padding: 2,
    justifyContent: "space-between", //Centered horizontally
  },
  TextInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: BlackTextColor,
    backgroundColor: whiteBackgroundColor,
    width: "80%",
  },
  labelContainer: {
    marginVertical: 10,
    marginTop: 10,
    fontSize: 13,
    color: BlackTextColor,
  },

  errorView: {
    backgroundColor: "#f9caca",
    borderWidth: 0.4,
    borderColor: "#990909",
    width: "100%",
    height: 45,
    marginTop: 10,
    borderRadius: 3,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  emptyText: {
    color: BlueTextColor,
    fontSize: 15,
    fontWeight: "bold",
  },
  AccountBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  AccountBoxTobBar: {
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    paddingHorizontal: 10,
  },
  accountImage: {
    height: 20,
    width: 20,
  },
  AccountTextName: { color: BlueTextColor, fontWeight: "700", marginLeft: 10 },
  AccountBorder: {
    borderTopWidth: 4,
    borderColor: ThikBorderGreyColor,
  },
  ChangeUserBottomBorder: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderColor: BlueTextColor,
  },
  AccountHeadingText: {
    fontSize: 15,
    fontWeight: "bold",
    color: BlackTextColor,
  },
  AccountUpdateButton: {
    borderColor: BlueTextColor,
    borderWidth: 1,
    width: 80,
    height: 35,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  AccountBorderBox: {
    borderTopWidth: 4,
    borderColor: ThikBorderGreyColor,
    marginVertical: 10,
  },
  AccountBoxHeadingText: {
    paddingHorizontal: 10,
    borderBottomWidth: 0.3,
    borderColor: BlueTextColor,
    paddingBottom: 10,
  },
  AccountBottom: { marginBottom: 10 },
  AccountUpdate: { marginTop: 10 },
  AccountDetailsText: { color: "#990909", marginHorizontal: 10 },
  AccountDetialsValueText: { marginLeft: 5, color: BlackTextColor },

  //Cart
  cartText: {
    color: BlackTextColor,
    fontWeight: "500",
  },
  mainBoxLoading: { opacity: 0.2, flex: 1 },
  mainBox: { backgroundColor: whiteBackgroundColor, flex: 1 },
  proceedButtonContainer: {
    backgroundColor: YellowColor,
    borderRadius: 5,

    margin: 10,
    paddingHorizontal: 50,
  },
  proceedButton: {
    fontWeight: "700",
    color: "white",
    paddingVertical: 10,
  },
  emptyButtonContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },

  deliveryTruckImage: {
    width: 50,
    height: 40,
    alignSelf: "center",
  },

  emptyText: {
    color: BlueTextColor,
    fontSize: 10,
    fontWeight: "bold",
  },
  emptyContainer: {
    borderColor: BlueTextColor,
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  orderText: {
    fontSize: 15,
    fontWeight: "800",
    color: BlackTextColor,
    marginHorizontal: 10,
  },

  fieldName: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    backgroundColor: "#f2f1ed",
    borderRadius: 3,
  },
  expandButton: {
    width: 12,
    height: 12,
    alignSelf: "center",
  },
  countModalView: {
    backgroundColor: whiteBackgroundColor,
    margin: 10,
    marginTop: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  shipCountBox: {
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: BlueTextColor,
    flexDirection: "row",
  },
  closeImage: {
    width: 20,
    height: 20,
  },
  deliveryTimeBox: {
    flexDirection: "row",
    borderColor: "#9b9b9b",
    borderWidth: 0.3,
    width: "80%",
    alignSelf: "center",
    paddingVertical: 10,
    marginVertical: 30,
    marginBottom: 50,
    borderRadius: 5,
  },
  shippingBox: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    color: BlackTextColor,
  },

  //CheckOut
  itemTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: BlackTextColor,
  },
  itemResponseTotalCostContainer: {
    alignItems: "flex-end",
  },
  thankYouContainer: {
    alignItems: "center",
    marginVertical: 20,
    textAlign: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginHorizontal: 10,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "800",
    color: BlackTextColor,
  },
  summaryContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  summaryText: {
    fontSize: 15,
    fontWeight: "800",
    color: BlackTextColor,
    textAlign: "center",
    marginVertical: 10,
  },
  itemEstimated: {
    fontWeight: "600",
    color: BlackTextColor,
  },
  itemTotalResponseText: {
    fontSize: 16,
    fontWeight: "800",
    color: BlackTextColor,
  },

  itemSubTotalResponseText: {
    color: "#409b4b",
    fontWeight: "800",
  },

  itemText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  itemResponseContainer: {
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  itemSubTotal: {
    fontWeight: "500",
    color: BlackTextColor,
  },
  itemResponseTextContainer: {
    alignItems: "flex-end",
  },
  itemQuantityContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
    marginHorizontal: 10,
  },
  itemResponseText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  quantityBox: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
  },

  //Login
  LogoImage: {
    width: 192,
    height: 51,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    backgroundColor: YellowColor,
    width: "100%",
    height: 40,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 3,
    justifyContent: "center",
  },
  labelContainer: {
    marginVertical: 10,
    marginTop: 20,
    fontSize: 13,
  },
  loginText: {
    color: whiteBackgroundColor,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  loginContainer: {
    backgroundColor: whiteBackgroundColor,
    marginHorizontal: 20,
  },
  signInText: {
    color: AndaBlueThemeColor,
    fontWeight: "700",
    fontSize: 20,
  },
  alertImage: { height: 19, width: 18 },
  errorMessage: { color: "#990909", marginHorizontal: 10 },
  signInBox: {
    paddingLeft: 15,
    paddingVertical: 20,
    backgroundColor: ThinBorderGreyColor,
  },
  loginMainBox: {
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: ThinBorderGreyColor,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  userAndPasswordHeading: {
    marginHorizontal: 5,
    color: BlueTextColor,
    fontWeight: "700",
  },
  footerBox: {
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: AndaBlueThemeColor,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  footerText: {
    color: whiteBackgroundColor,
    fontSize: 10,
    fontWeight: "800",
    paddingBottom: 20,
    paddingTop: 10,
  },
  loginContainerBox: {
    flex: 1,
    justifyContent: "center",
  },
  eyeButton: {
    justifyContent: "center",
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  forgotContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  //MenuBar
  closeMenuButton: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutBox: {
    backgroundColor: YellowColor,
    width: 80,
    height: 35,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  logoutText: {
    color: whiteBackgroundColor,
    fontSize: 12,
    fontWeight: "800",
  },
  prductListBlue: {
    backgroundColor: BlueTextColor,
    paddingVertical: 5,
    justifyContent: "center",
  },
  productText: {
    color: whiteBackgroundColor,
    alignItems: "center",
    textAlign: "center",
    fontWeight: "600",
    justifyContent: "center",
  },
  topBarBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    height: 40,
    width: 40,
    justifyContent: "center",
  },
  closeButtonPosition: {
    justifyContent: "center",
    alignSelf: "center",
    padding: 15,
  },
  closeButtonImage: {
    height: 20,
    width: 20,
  },
  catagorySlab: {
    borderBottomWidth: 1,
    borderColor: ThinBorderGreyColor,
    paddingBottom: 5,
  },
  screenName: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  screenNameGreyText: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "grey",
  },

  //returnPolicy

  returnBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#d9d9d9",
  },
  paragraphText: { marginVertical: 3, color: BlackTextColor },
  seeRelatedModal: {
    backgroundColor: whiteBackgroundColor,
    marginTop: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  seeRelatedBox: {
    justifyContent: "flex-end",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: BlueTextColor,
    flexDirection: "row",
  },
  blueButton: {
    backgroundColor: BlueTextColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  //submitCart
  editComponent: {
    alignItems: "flex-end",
  },

  submitButtonContainer: {
    height: 50,
    backgroundColor: YellowColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: YellowColor,
    marginHorizontal: 10,
    marginTop: 20,
  },
  submitButton: {
    paddingVertical: 15,
    fontWeight: "700",
    color: "white",
  },
  detailsContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  editOrderText: {
    color: BlueTextColor,
    fontSize: 12,
    fontWeight: "800",
  },

  //TabBar
  logoName: {
    color: BlackTextColor,
    fontSize: 10,
  },
  logoNameLight: {
    fontSize: 10,
    color: BlueTextColor,
  },
  upperBorder: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 3,
    borderColor: BlueTextColor,
    paddingTop: 7,
    width: "25%",
  },
  upperBorderNone: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    width: "25%",
  },

  //productdetails

  icons: {
    backgroundColor: ThinBorderGreyColor,
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  iconsOff: {
    backgroundColor: whiteBackgroundColor,
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 10,
  },

  //
  searchBox: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: ThinBorderGreyColor,
    padding: 5,
    borderRadius: 3,
  },
  input: {
    color: BlackTextColor,
    fontSize: 12,
    width: "70%",
    marginHorizontal: 5,
  },
  search: {
    color: "#9b9b9b",
    fontWeight: "800",
    paddingLeft: 10,
  },
  searchItemList: {
    height: 25,
    borderColor: "#9b9b9b",
    borderTopWidth: 0.3,
    justifyContent: "center",
    marginVertical: 1,
  },
  searchIconBlue: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: BlueTextColor,
    borderRadius: 3,
  },
  searchIcon: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 3,
  },

  ///
  poBox: {
    height: 30,
    width: 200,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.15)",
  },
  bestPriceComponent: {
    backgroundColor: YellowColor,
    width: 80,
    borderRadius: 3,
    alignItems: "center",
  },
  bestPriceText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  emptyPagination: {
    marginTop: 60,
  },
});

export { styles };
