import Style from "./style.module.css";
import useKeyPress from "../../hooks/useKeyPress";
import Card from "../../widgets/Card/Card";
import { useRef, useState, useEffect } from "react";
import { instance } from "../../app/api/api.config";

export default function Queue() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const focusCards = useRef([]);
  let focusTarget = 0;

  useEffect(() => {
    if (isLoading) {
      instance
        .get("/bulletins")
        .then((response) => {
          setData(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
    if (focusCards.current[0]) {
      focusCards.current[0].focus();
    }
    if (isUploading) {
      instance
        .post(
          "/bulletins",
          data.map(({ id, cause, decision }) => {
            return decision === "approve"
              ? { id, decision }
              : { id, cause, decision };
          })
        )
        .then((response) => {
          console.log(response.data);
        })
        .finally(() => {
          setIsUploading(false);
          setData([]);
          focusTarget = 0;
          setIsLoading(true);
        })
        .catch((error) => console.log(error));
    }
  }, [isLoading, data, focusCards, isUploading]);

  const focusNextBulletin = () => {
    if (focusTarget < 9) {
      focusTarget++;
    }
    focusCards.current[focusTarget].focus();
  };

  const callback = (id, value, parameterName) => {
    data.map((bulletin) => {
      if (bulletin.id === id) {
        bulletin[parameterName] = value;
      }
    });
  };

  const onKeyPress = (event) => {
    switch (event.key) {
      case " ":
        event.preventDefault();
        break;
      case "Enter":
        event.preventDefault();
        if (data.length === 0) {
          setIsLoading(true);
        }
        break;
      case "F7":
        event.preventDefault();
        setIsUploading(true);

        break;
    }
  };
  useKeyPress([" ", "F7", "Delete", "Enter"], onKeyPress);

  return (
    <>
      {data.map((bulletin, i) => (
        <Card
          bulletin={bulletin}
          key={bulletin.id}
          ref={(el) => (focusCards.current[i] = el)}
          focusNextBulletin={focusNextBulletin}
          callback={callback}
        />
      ))}

      <div className={Style.buttons}>
        <div className={Style.buttonFlex}>
          <button className={Style.btn}>Одобрить</button>
          <div className={Style.hotkey}>
            <span className={`${Style.dot} ${Style.green}`}></span>
            <span className={Style.hotkey}>Пробел</span>
          </div>
        </div>

        <div className={Style.buttonFlex}>
          <button className={Style.btn}>Отклонить</button>
          <div className={Style.hotkey}>
            <span className={`${Style.dot} ${Style.orange}`}></span>
            <span className={Style.hotkey}>Del</span>
          </div>
        </div>
        <div className={Style.buttonFlex}>
          <button className={Style.btn}>Эскалация</button>
          <div className={Style.hotkey}>
            <span className={`${Style.dot} ${Style.blue}`}></span>
            <span className={Style.hotkey}>Shift+Enter</span>
          </div>
        </div>
        <div className={Style.buttonFlex} style={{ justifyContent: "start" }}>
          <button className={Style.btn}>Сохранить</button>
          <span style={{ marginLeft: 18 }}>F7</span>
        </div>
      </div>
    </>
  );
}
