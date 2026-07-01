import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaGift, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { userController } from '../../controller';

const Bonus = () => {
  const { isLoggedIn, user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user?.loginToken) {
      fetchOffers();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, user?.loginToken]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await userController.getOffers(user.loginToken);
      if (response && typeof response === 'object' && !response.error) {
        const rawOffers = Object.values(response).filter(v => v && typeof v === 'object' && v.OfferId);
        setOffers(rawOffers);
      } else if (response && response.error === '0') {
        setOffers(response.offers || []);
      }
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferClick = async (offer) => {
    setSelectedOffer(offer);
    setDetailLoading(true);
    try {
      const response = await userController.getOfferDetail(user.loginToken, offer.OfferId);
      if (response) {
        let data = response;
        if (typeof response === 'object' && !response.detail && !response.Description) {
          const firstVal = Object.values(response).find(v => v && typeof v === 'object' && (v.detail || v.Description || v.OfferId));
          if (firstVal) data = firstVal;
        }

        if (data.detail || data.Description || data.error === '0') {
          const rawHtml = data.detail || data.Description || '';
          const cleanedHtml = rawHtml
            .replace(/[\?\uFFFD]/g, '')
            .replace(/&ndash;/g, '–')
            .trim();

          setSelectedOffer({
            ...offer,
            Description: cleanedHtml,
            Banner: data.Banner || data.image || offer.Banner,
            Eligible: data.eligible || data.Eligible
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch offer detail:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleClaimOffer = async () => {
    if (!selectedOffer || claiming) return;

    if (selectedOffer.Eligible?.toUpperCase() !== 'Y') {
      alert('You are not eligible for this offer.');
      return;
    }

    setClaiming(true);
    try {
      const response = await userController.claimOffer(user.loginToken, selectedOffer.OfferId);
      if (response.error === '0' || response.error === null) {
        alert(response.msg || 'Offer claimed successfully!');
        setSelectedOffer(null);
      } else {
        alert(response.msg || 'Failed to claim offer.');
      }
    } catch (error) {
      alert('Error claiming offer');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white font-[family-name:var(--font-roboto-condensed)] min-h-[70vh]">
      <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex flex-wrap items-center justify-between h-auto min-h-[41px]">
        <div className="flex items-center gap-2">
          <span>Bonuses & Promotions</span>
          <span className="text-[13px] flex items-center gap-1 font-normal opacity-90 hover:underline cursor-pointer">
            Terms & Conditions <FaInfoCircle size={14}/>
          </span>
        </div>
        {isLoggedIn && (
          <button 
            onClick={fetchOffers}
            className="text-[12px] bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-3 rounded uppercase border-none cursor-pointer tracking-wider"
          >
            Refresh
          </button>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col bg-gray-50">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 flex-1">
            <div className="w-10 h-10 border-4 border-[#005a78] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold tracking-wider uppercase text-[12px]">Fetching Promotions...</p>
          </div>
        ) : !isLoggedIn ? (
          <div className="bg-white border border-gray-300 rounded p-8 text-center flex flex-col items-center max-w-lg mx-auto shadow-sm my-auto">
            <div className="text-[45px] mb-3 text-[#005a78]"><FaGift className="mx-auto" /></div>
            <h3 className="text-gray-800 text-[18px] font-bold mb-2 uppercase">Exclusive Offers Await</h3>
            <p className="text-gray-500 text-[13px] mb-6 leading-relaxed">Login to your account to view and claim personalized bonuses, promotions, and special rewards.</p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-2.5 px-8 rounded uppercase tracking-wider transition-colors border-none cursor-pointer text-[13px]"
            >
              Login to View
            </button>
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-white border border-gray-300 rounded p-10 text-center max-w-lg mx-auto my-auto shadow-sm">
            <p className="text-gray-500 text-[14px] font-bold italic m-0">No offers available at the moment. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {offers.map((offer) => (
              <div key={offer.OfferId} className="bg-white border border-gray-300 rounded overflow-hidden hover:border-[#0088cc] transition-colors shadow-sm flex flex-col">
                <div className="h-[140px] bg-gray-100 flex items-center justify-center relative border-b border-gray-200">
                  {offer.Banner ? (
                    <img 
                      src={offer.Banner.startsWith('data:') ? offer.Banner : `data:image/png;base64,${offer.Banner}`} 
                      alt={offer.Title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-[40px] text-[#005a78]"><FaGift /></div>
                  )}
                  <div className="absolute top-2 left-2 bg-[#005a78] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    {offer.Category || 'Offer'}
                  </div>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-gray-800 text-[14px] font-bold m-0 mb-3 line-clamp-2 min-h-[36px]">
                    {offer.Title}
                  </h3>
                  <button 
                    onClick={() => handleOfferClick(offer)}
                    className="mt-auto w-full bg-gray-200 hover:bg-[#0088cc] hover:text-white text-gray-800 py-2 rounded font-bold uppercase text-[11px] transition-colors border-none cursor-pointer tracking-wide"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedOffer && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
            onClick={() => setSelectedOffer(null)}
          >
            <div 
              className="bg-white border border-gray-300 w-full max-w-[500px] rounded shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#005a78] text-white px-4 py-3 flex justify-between items-center shrink-0">
                <h3 className="text-[15px] font-bold uppercase m-0 tracking-wide pr-4 truncate">
                  {selectedOffer.Title}
                </h3>
                <button 
                  className="text-white hover:opacity-80 bg-transparent border-none text-[26px] leading-none cursor-pointer transition-opacity p-0"
                  onClick={() => setSelectedOffer(null)}
                >
                  ×
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-4 bg-gray-50">
                {detailLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-8 h-8 border-3 border-[#005a78] border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-500 text-[11px] font-bold tracking-wider uppercase">Loading Details...</p>
                  </div>
                ) : (
                  <>
                    {selectedOffer.Banner && (
                      <div className="w-full bg-black rounded mb-4 overflow-hidden border border-gray-200">
                        <img 
                          src={selectedOffer.Banner.startsWith('data:') ? selectedOffer.Banner : `data:image/png;base64,${selectedOffer.Banner}`} 
                          alt={selectedOffer.Title} 
                          className="w-full object-contain max-h-[180px] mx-auto"
                        />
                      </div>
                    )}
                    <div className="px-3 py-2 flex justify-between items-center border-b border-gray-200 bg-white rounded mb-4 shadow-xs">
                      <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {selectedOffer.Category || 'Promotion'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        selectedOffer.Eligible?.toUpperCase() === 'Y' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {selectedOffer.Eligible?.toUpperCase() === 'Y' ? (
                          <>
                            <FaCheckCircle size={10} />
                            <span>Eligible</span>
                          </>
                        ) : (
                          <>
                            <FaTimesCircle size={10} />
                            <span>Not Eligible</span>
                          </>
                        )}
                      </span>
                    </div>
                    <div 
                      className="text-gray-700 text-[13px] leading-relaxed offers-html-content bg-white p-3 border border-gray-200 rounded shadow-xs"
                      dangerouslySetInnerHTML={{ __html: selectedOffer.Description || 'No details available.' }}
                    />
                  </>
                )}
              </div>

              {!detailLoading && (
                <div className="p-4 border-t border-gray-200 bg-white shrink-0">
                  <button
                    disabled={claiming || selectedOffer.Eligible?.toUpperCase() !== 'Y'}
                    onClick={handleClaimOffer}
                    className={`w-full py-3 rounded font-bold uppercase text-[12px] tracking-wide transition-all border-none ${
                      selectedOffer.Eligible?.toUpperCase() === 'Y'
                        ? 'bg-[#0088cc] hover:bg-[#0077b3] text-white cursor-pointer shadow-md'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {claiming ? 'Claiming...' : 'Claim Offer Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <style dangerouslySetInnerHTML={{
          __html: `
          .offers-html-content p { margin-top: 0; margin-bottom: 0.8em; }
          .offers-html-content a { color: #0088cc; text-decoration: none; }
          .offers-html-content a:hover { text-decoration: underline; }
          .offers-html-content ul { padding-left: 18px; margin-bottom: 0.8em; }
          .offers-html-content li { margin-bottom: 0.4em; }
        `}} />
      </div>
    </div>
  );
};

export default Bonus;
