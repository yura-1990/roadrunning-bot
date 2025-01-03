import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SingleMarathon = () => {
    const {t, i18n} = useTranslation()

    return <div>
        <h1 className="text-center my-4 text-theme">Marathon Results</h1>

        <div className="result mt-5">
            <div className="result-item rounded second-place">
                <div className="result-second-position text-theme">{t('2nd')}</div>
                <div className="result-item-bg">
                    <i className="icon fas fa-medal result-icon mb-2 text-theme"></i>
                </div>
                <div className="card bg-transparent border-0">
                    <div className='card-header'>
                        <h4 className="card-title  text-center text-white result-participant mb-0"> Karimov Husniddin Egam ogli </h4>
                    </div>
                    <div className="card-body p-0">
                        <p className="card-text text-center text-white fw-medium">Toplagan bali: 125s</p>
                    </div>
                    <div className="card-footer">
                        <div className="runner-time text-center text-white fw-medium">2:12:11</div>
                    </div>
                </div>

            </div>

            <div className="result-item rounded first-place">
                <div className="result-first-position text-theme">{t('1st')}</div>
                <div className="result-item-bg">
                    <i className="icon fas text-gold result-icon fa-crown mb-2"></i>
                </div>

                <div className="card bg-transparent border-0">
                    <div className='card-header'>
                        <h4 className="card-title text-white text-center  result-participant mb-0 "> Karimov Husniddin Egam
                            ogli </h4>
                    </div>
                    <div className="card-body p-0">
                        <p className="card-text text-center text-white fw-medium">Toplagan bali: 125s</p>
                    </div>
                    <div className="card-footer">
                        <div className="runner-time text-center text-white fw-medium">2:12:11</div>
                    </div>
                </div>
            </div>

            <div className="result-item rounded third-place">
                <div className="result-third-position text-theme">{t('3rd')}</div>
                <div className="result-item-bg">
                    <i className="icon fas fa-trophy result-icon text-silver mb-2"></i>
                </div>

                <div className="card bg-transparent border-0">
                    <div className='card-header'>
                        <h4 className="card-title text-white text-center  result-participant mb-0"> Karimov Husniddin Egam ogli </h4>
                    </div>
                    <div className="card-body p-0">
                        <p className="card-text text-center text-white fw-medium">Toplagan bali: 125s</p>
                    </div>
                    <div className="card-footer">
                        <div className="runner-time text-center text-white fw-medium">2:12:11</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="table-responsive mt-2">
            <table className="table table-striped table-hover caption-top">
                <caption className="fw-bold h3 text-theme text-center">{ t('participants_list') }</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Names</th>
                    <th scope="col">Scores</th>
                    <th scope="col">Position</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
}

export default SingleMarathon;