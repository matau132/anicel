import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import DropDownSearch from "../../UI/DropDownSearch";
import "./SearchDetail.css";
import _ from "lodash";
import AnimeData from "../../../api/GetData";

function SearchDetail({ setName, setGenre, setYear, setSeason }) {
  const [listGenres, setListGenres] = useState([]);
  const animeData = new AnimeData();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    loadGenre();

    return () => {
      mounted.current = false;
      animeData.signal.cancel("Request canceled!");
    };
  }, []);

  const loadGenre = async () => {
    const path = `resources/1.0/0`;
    const { response, isError } = await animeData.getAnimeData(path);
    if (mounted.current) {
      if (isError || response?.status_code !== 200) {
        setListGenres([]);
      } else {
        setListGenres(response.data.genres);
      }
    }
  };

  const getYearList = useMemo(() => {
    let currentYear = new Date().getFullYear();
    let endYear = 1990;
    const listYear = [];
    while (currentYear >= endYear) {
      listYear.push(currentYear--);
    }
    return listYear;
  }, []);

  const getSeasonList = useMemo(() => {
    return ["Spring", "Summer", "Autumn", "Winter"];
  }, []);

  const handleNameChange = _.debounce((e) => {
    setName(e.target.value);
  }, 500);

  const handleGenreChange = (value) => {
    if (value === "All") value = "";
    if (value === "Slice Of Life") value = "Slice of Life";
    if (value === "Coming Of Age") value = "Coming of Age";

    setGenre(value);
  };

  const handleYearChange = (value) => {
    if (value === "All") value = "";
    setYear(value);
  };

  const handleSeasonChange = (value) => {
    if (value === "All") value = "";
    setSeason(value);
  };

  return (
    <div className="body-search-section pt-3">
      <div className="d-flex flex-wrap justify-content-between">
        <div className="search-name">
          <p className="mb-2">Name</p>
          <div className="position-relative mb-4">
            <input
              type="text"
              placeholder=""
              className="search-input"
              onChange={handleNameChange}
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="search-gen mb-4">
          <p className="mb-2">Genre</p>
          <DropDownSearch
            placeholder="All"
            dropDownData={["All", ...listGenres]}
            onChange={handleGenreChange}
          ></DropDownSearch>
        </div>
        <div className="search-gen mb-4">
          <p className="mb-2">Year</p>
          <DropDownSearch
            placeholder="All"
            dropDownData={["All", ...getYearList]}
            onChange={handleYearChange}
          ></DropDownSearch>
        </div>
        <div className="search-gen">
          <p className="mb-2">Season</p>
          <DropDownSearch
            placeholder="All"
            dropDownData={["All", ...getSeasonList]}
            onChange={handleSeasonChange}
          ></DropDownSearch>
        </div>
      </div>
    </div>
  );
}

export default memo(SearchDetail);
