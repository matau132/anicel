import React, { memo, useEffect, useRef, useState } from "react";
import "./Search.css";
import AnimeData from "../../api/GetData";
import _ from "lodash";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { NavLink, useLocation, useHistory } from "react-router-dom";

function Search() {
  const animeData = new AnimeData();
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const closeSearchRef = useRef();
  const { pathname } = useLocation();
  const history = useHistory();

  const handleSearchChange = _.debounce((e) => {
    setSearchValue(e.target.value);
    setLoading(true);
    setSearchList([]);
  }, 500);

  const getSearchAnime = async () => {
    const path = `anime?title=${searchValue}&page=1&per_page=10`;
    const { response, isError } = await animeData.getAnimeData(path);
    if (isError || response?.status_code !== 200) {
      setSearchList([]);
    } else {
      setSearchList(response.data.documents);
    }
    setLoading(false);
  };

  const getHighlightSearchName = (name) => {
    const idx = name.toLowerCase().indexOf(searchValue.toLowerCase());
    if (idx >= 0) {
      return (
        <>
          {name.substring(0, idx)}
          <span style={{ color: "#4528dc" }}>
            {name.substring(idx, idx + searchValue.length)}
          </span>
          {name.substring(idx + searchValue.length)}
        </>
      );
    }
    return "";
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${searchValue}`);
  };

  useEffect(() => {
    if (searchValue !== "") {
      getSearchAnime();
    } else {
      setLoading(false);
      setSearchList([]);
    }
  }, [searchValue]);

  useEffect(() => {
    closeSearchRef.current.click();
  }, [pathname]);

  return (
    <div id="search" className="modal fade p-0">
      <div className="modal-dialog dialog-animated">
        <div className="modal-content h-100" style={{ overflow: "hidden" }}>
          <div className="modal-header" data-dismiss="modal">
            Search{" "}
            <i
              className="far fa-times-circle icon-close"
              ref={closeSearchRef}
            />
          </div>
          <form
            className="row"
            style={{ padding: "0 2rem" }}
            onSubmit={handleSearchSubmit}
          >
            <div className="col-12 align-self-center">
              <div className="row">
                <div className="input-group mt-4">
                  <input
                    type="text"
                    placeholder="Enter your keywords"
                    className="search-anime-input"
                    onChange={handleSearchChange}
                  />
                  <NavLink
                    to={`/search?name=${searchValue}`}
                    className="search-icon-direct"
                  >
                    <i className="fas fa-search"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </form>
          <div className="modal-body d-block">
            <div className="col-12 mt-4 search-anime-list">
              <div>
                {searchList.map((data) => {
                  return (
                    <NavLink
                      to={`/anime/${data.id}`}
                      title={data.titles.en}
                      key={data.id}
                    >
                      <div className="d-flex search-anime-item mb-3">
                        <div className="search-img-wrapper mr-3">
                          <img src={data.cover_image} alt="" />
                        </div>
                        <div>
                          <p>{getHighlightSearchName(data.titles.en)}</p>
                        </div>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Loader
                visible={loading}
                type="Oval"
                color="#4528dc"
                height={40}
                width={40}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Search);
