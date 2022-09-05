import {useEffect, useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {api} from "../utils/Api";
import {apiAuth} from "../utils/ApiAuth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import '../index.css';

import {AddPlacePopup} from "./AddPlacePopup";

export default function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        Promise.all([api.getInitialCards(), apiAuth.getUserInfo()])
            .then(([cards, userInfo]) => {
                setCards(cards);
                setCurrentUser({
                    ...userInfo
                });
            }).catch((err) => {
                console.log(err);
            });
    }, [isLoggedIn]);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen

    useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if(isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    const handleUpdateUser = (data) => {
        api.patchUserInfo(data).then((user) => {
            setCurrentUser({
                ...currentUser,
                ...user
            });
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleUpdateAvatar = (data) => {
        api.patchUserAvatar(data).then((user) => {
            setCurrentUser({
                ...currentUser,
                ...user
            });
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleAddPlace = (card) => {
        api.postNewCard(card).then((card) => {
            setCards([card, ...cards]);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateCards = (card) => {
        setCards((state) => {
            return state.map(item => item._id === card._id ? card : item);
        })
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(item => item === currentUser._id);
        if (isLiked) {
            api.deleteLike(card._id).then((card) => {
                updateCards(card);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            api.putLike(card._id).then((card) => {
                updateCards(card);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const handleDeleteCard = (card) => {
        const isOwn = card.owner === currentUser._id;

        if (isOwn) {
            api.deleteCard(card._id).then(() => {
                setCards((state) => {
                    return state.filter(item => item._id !== card._id);
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const signOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        history.push("/sign-in");
    }

    const handleRegister = (data) => {
        apiAuth.registerUser(data).then(() => {
            setIsRegistrationComplete(true);
        }).catch(() => {
            setIsRegistrationComplete(false);
        }).finally(() => {
            setIsInfoTooltipOpen(true);
        })
    }

    const handleLogin = (data) => {
        apiAuth.loginUser(data).then((newData) => {
            if (newData.token) {
                apiAuth.setHeaders({
                    Authorization : `Bearer ${newData.token}`
                });

                api.setHeaders({
                    Authorization : `Bearer ${newData.token}`
                });

                localStorage.setItem('token', newData.token);
                localStorage.setItem('userId', newData.id);

                setIsLoggedIn(true);

                history.push('/');
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page__content">
            <Header
                userEmail={currentUser.email}
                onSignOut={signOut}
            />
              <Switch>
                  <Route path="/sign-up">
                      <Register
                          handleRegister={handleRegister}
                          isInfoTooltipOpen={isInfoTooltipOpen}
                          isRegistrationComplete={isRegistrationComplete}
                      />
                  </Route>
                  <Route path="/sign-in">
                      <Login
                          handleLogin={handleLogin}
                      />
                  </Route>
                  <ProtectedRoute
                      path="/"
                      component={Main}
                      loggedIn={isLoggedIn}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteCard}
                  />
              </Switch>
            <ImagePopup
                card={selectedCard}
                isOpened={isImagePopupOpen}
                onClose={closeAllPopups}
            />
            <Footer />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
            />

            <PopupWithForm
                name="confirm"
                title="Вы уверены?"
                submitBtnText="Да"
            />

              <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
              />

              <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  registrationComplete={isRegistrationComplete}
              />
          </div>
      </CurrentUserContext.Provider>
  );
}