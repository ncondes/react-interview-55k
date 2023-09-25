import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { getUsers } from "./api/getUsers";
import { SortType, User } from "./interfaces";
import { Button, UserList, Search } from "./components";

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showColoredRows, setShowColoredRows] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [query, setQuery] = useState("");

  const usersData = useRef<User[]>([]);

  const toggleShowColoredRows = () => {
    setShowColoredRows(!showColoredRows);
  };

  const toggleSortByCountry = () => {
    sortType === SortType.None
      ? setSortType(SortType.Country)
      : setSortType(SortType.None);
  };

  const handleSortType = (sortType: SortType) => () => {
    setSortType(sortType);
  };

  const resetUsers = () => {
    setUsers(usersData.current);
    setSortType(SortType.None);
    setQuery("");
  };

  const deleteUser = (email: string) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const sortedUsers = useMemo(() => {
    if (sortType === SortType.None) return users;
    // sort by country
    if (sortType === SortType.Country) {
      return structuredClone(users).sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    }
    // sort by first name
    if (sortType === SortType.First) {
      return structuredClone(users).sort((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
    }
    // sort by last name
    if (sortType === SortType.Last) {
      return structuredClone(users).sort((a, b) =>
        a.name.last.localeCompare(b.name.last)
      );
    }

    return users;
  }, [users, sortType]);

  const filteredUsers = useMemo(() => {
    if (!query) return sortedUsers;

    return sortedUsers.filter(
      (user) =>
        user.name.first.toLowerCase().includes(query.toLowerCase()) ||
        user.name.last.toLowerCase().includes(query.toLowerCase()) ||
        user.location.country.toLowerCase().includes(query.toLowerCase())
    );
  }, [sortedUsers, query]);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data.results);
        usersData.current = data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>React Coding challenge</h1>
        <section className="header__buttons-section">
          <Button onClick={toggleShowColoredRows}>
            <span>Color Rows</span> <i className="fa-solid fa-brush"></i>
          </Button>
          <Button onClick={toggleSortByCountry}>
            <span>
              {sortType !== SortType.None ? "Unsort" : "Sort By Country"}
            </span>{" "}
            {sortType !== SortType.None ? (
              <i className="fa-solid fa-arrow-left"></i>
            ) : (
              <i className="fa-solid fa-earth-americas"></i>
            )}
          </Button>
          <Button onClick={resetUsers}>
            <span>Reset</span> <i className="fa-solid fa-rotate-left"></i>
          </Button>
          <Search
            placeholder="Search ..."
            value={query}
            onChange={handleSearch}
          />
        </section>
      </header>
      <main className="main">
        <UserList
          users={filteredUsers}
          showColoredRows={showColoredRows}
          deleteUser={deleteUser}
          handleSortType={handleSortType}
        />
      </main>
    </div>
  );
};
